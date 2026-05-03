import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const body = await request.json()

  const supabase = await createClient()

  // create company
  const { data: company } = await supabase
    .from('companies')
    .insert({ name: body.company, website: body.website || null })
    .select()
    .single()

  // create job as pending
  const tags = body.tags ? body.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : []
  const { data: job } = await supabase
    .from('jobs')
    .insert({
      company_id: company?.id,
      title: body.title,
      description: body.description,
      location: body.location,
      salary_min: body.salaryMin ? parseInt(body.salaryMin) * 1000 : null,
      salary_max: body.salaryMax ? parseInt(body.salaryMax) * 1000 : null,
      tags,
      apply_url: body.applyUrl,
      status: 'pending',
    })
    .select()
    .single()

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: `Job listing: ${body.title} at ${body.company}` },
        unit_amount: 19900,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?job_id=${job?.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/post`,
    metadata: { job_id: job?.id },
  })

  // save stripe session id on job
  await supabase.from('jobs').update({ stripe_session_id: session.id }).eq('id', job?.id)

  return NextResponse.json({ url: session.url })
}
