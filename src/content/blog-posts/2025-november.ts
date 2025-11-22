import { BlogPost } from '../../types/blog'

export const november2025Posts: BlogPost[] = [
  {
    id: 'deployment-day',
    title: 'Deployment Day',
    date: 'November 14, 2025',
    location: 'Bocas del Toro, Panama',
    slug: 'deployment-day',
    year: '2025',
    excerpt: 'The only place with power on the island was the Chabad House. A chaotic, beautiful day of deploying our first automation into production.',
    content: `The sound of the AC clicking off lightly pulls me out of sleep. It's 6:15 AM in my little yellow house in Bocas del Toro, Panama, and a soft wash of morning light sneaks through the high window above the balcony door. I blink, confused, until I remember that yesterday our Airbnb host told us the entire province would lose power from 6 to 10.

Still half-asleep, I step onto the balcony and do a few slow shoulder stretches. My great friend and business partner, Kyle, and I have been on the islands of Bocas del Toro for a week and a half running our AI and software automation business, and today marks a big moment in our journey. We are deploying our first automation live into production for hundreds of users.

As 7 AM comes around and we wipe the sleepiness from our eyes and minds, we begin to get giddy. We start cheering and singing, "Deployment Day oh Deployment Day how I love you." Deploying a piece of software into the real world feels huge for two hippie backpackers like us.

As we move through our morning routine, we assume at least one place on the island must have power, Starlink, or a backup generator. We head toward Bambuda Hostel, a staple of our working rhythm on this trip, to check if they have power and WiFi. We arrive, and to little surprise, there is no WiFi, though they have food thanks to gas stoves. Kyle sits and eats, as he is a hungry boy, and I decide to walk around town to hunt for power.

I check all the Viber cafés and hotels on the island and every one of them is dark. At first it doesn't feel like a problem. We planned to deploy in the afternoon and our only meeting was at 11. It's barely 8. I return to Bambuda to report back to Kyle that the whole town is down and we sit patiently. We play two games of chess, one win each, stretching between turns as anticipation creeps in. We count down the minutes to 10 AM, the promised return of power.

There are locals outside playing dominoes who are oblivious to the whole power outage. Oh a beautiful dichotomy.

Ten o'clock hits. I refresh. Nothing.
10:05. Still nothing.

We leave Bambuda to search again. Then a brilliant idea hits: the Chabad House. If anyone has a generator, it's the rabbi.

We walk over, hold our breath, and yes—they have power and WiFi. The only place on the entire island. Of course.

We step inside and end up singing with the rabbi. He mentions he has a mikvah and it shocks me. The Chabad is gorgeous, right on the water, with a dock and a little mikvah that's basically a hole in the floor leading straight to the ocean. I hadn't showered because of the outage, so it's perfect. Afterwards I spot real showers with soap. I feel human again.

It's nearing 11, just in time for our meeting with Kaleb from Barefoot Grass. We scramble to get set up. I order a chicken shawarma pita and eat on the call because I'm starving. The meeting goes smoothly.

Then comes the moment we've been waiting for: Deployment Day. Another customer had emailed saying we were "good to go," and we interpret this as approval to deploy immediately.

We sit in the Chabad House, heads down, migrating his domain from the old site to ours. After some time, the switch completes. But we notice an issue: sometimes our site loads, other times the old one. The "www" version is causing trouble. We scramble to fix it, adjust DNS, and finalize the migration.

Next, I try logging into the admin portal and it fails. Another fire. We research and patch it fairly quickly.

Meanwhile the rabbi's kids in the next room are having a full-blown concert—screaming, belting songs, banging on whatever they can find. We joke under our breath, "Rabbi, please turn it down," but keep grinding.

Right then our customer starts blowing up our inbox.

"Why is the site down?"
"Why do I have no sales?"
"I thought you were doing the migration at NIGHT!"

That's when we realize we misunderstood. We took "good to go" as deploy now. He meant everything was ready for later. A clear miscommunication.

We stabilize him with a call, finish fixing the admin portal, and he calms down. He likes the new setup but is rattled by the surprise. For now, things level out.

Kyle and I stand, stretch, and high-five. We leave the Chabad House for a reliable Viber café. Kyle orders a burger—finally—and I get a smoothie. We pull up our monitoring dashboard and watch real traffic hitting our product. It feels electric.

Then I spot something.

"Payment succeeded but no submission."

One error. Then another. Then dozens.

Oh no I think, people are paying without going them the product!!! I think that's what was happening.

I alert Kyle. At the exact same moment, our customer starts panicking again, now about delayed emails. He demands a call.

Kyle jumps on the phone, abandoning his burger. I dive into the code. Errors keep growing. Our customer is furious. It's chaos.

Kyle suggests rolling back the deployment. I'm reluctant but he's right. We need to stop the damage. We roll the site back to the old version.

While all of this is happening, the Panamanian waitress asks Kyle if he's finished with his burger. He's too locked into the conversation to answer and she doesn't get the hint. He shoos her away without breaking eye contact.

We feel defeated. Just an hour ago we were celebrating and now we're sweating, worried we cost our client money.

We walk back to our little yellow house where the day began and sit to reflect. We piece together clues, manage the customer, and start forming a plan.

And even with the chaos, the mistakes, the scramble, and the stress…

It was a beautiful Deployment Day. Full of lessons, stories, and moments we'll remember forever.

Deployment Day, Deployment Day, how I love you.`,
    images: []
  },
  {
    id: 'three-phase-war',
    title: 'The Three Phase War',
    date: 'November 11, 2025',
    location: 'Bocas del Toro, Panama',
    slug: 'three-phase-war',
    year: '2025',
    excerpt: 'Returning home from a 10 month world tour and fighting to keep the fire alive. A journey through three phases: returning home, fighting external influences, and starting a business.',
    content: `A very good friend said to me recently that I have not shared much in recent months. I thanked him for bringing it up and I began to think why. Here is what I came up with. It has only been 3.5 months since I returned to North America, from my 10 month long backpacking world tour. In the weeks leading up to preparing to come home, I prepared myself mentally for the battle ahead. It was a necessity to take all of my learnings from my trip and to not budge on my values once returning home with many external influences. As I arrived back home I felt well equipped. I was heads down focusing on keeping my learnings and fire from my trip. For me it took about 1 month to settle back home and process every thing that was going on. When you are on the battle field fighting for your values that is your singular focus. So after a month goes by at home you start to ask yourself, now what. Parents begin to ask, friends, and most of their comments are adverse to all your values you learned on your trip. Inevitably the thoughts sneak into your mind, about retuning to a corporate job hunched over at a desk that you don't like. Which means not being on fire in life, not being healthy and connected. This is when the second battle ensues, to push out the external noise and trust in yourself and the process. To be honest I was pretty close to faltering. I applied top jobs I did not care about in places I did not want to be just to go through the motions, because what else was there to do? In this time I worked hard on the side with Kyle to combat this daunting foe. We tried idea after idea, project after project, any nothing seemed to hit. A subtle shift changed everything. We were trying to do side projects to get off the ground to make money, but side projects don't get it. We had to go full commitment to making a business, not a side project. We began to talk the talk before walking the walk. The walk came but there was necessity in the allusion of confidence. At the end of the day we were just two unemployed guys in our parent's house, can those guys really start a business? Then I reflected. All of the most inspirational entrepreneurs went through the same struggle. Imposters syndrome, living in undesirable places… So when Kyle and I committed to making a business, not kinda working on a Sid project, everything changed. So this is why I have not been sharing as much. I have been in a three phase war. 1. Returning Home 2. Fighting off External Influences 3. Starting a business. War has a negative connotation, but this is a happy war, a war I gladly chose to enlist in, fight in, and die for. Hoorah`,
    images: []
  },
  {
    id: 'ratzo-vshov-running-and-returning',
    title: 'Ratzó v\'Shov: Running and Returning',
    date: 'November 4, 2025',
    location: 'Bocas del Toro, Panama',
    slug: 'ratzo-vshov-running-and-returning',
    year: '2025',
    excerpt: 'The energy that starts a business is not the same energy that scales it. Reflections on impulse, creativity, and the balance between running and returning.',
    content: `I have always thought the yin and yang is a beautiful concept and illustration. It parallels a deeply kabbalistic concept of Ratzó v'Shov, running and returning. Maybe a year and a half ago I would go on a deep spiritual discourse about the hidden meanings behind these concepts, but now my newest ego and evolution wants to be simple concise and concrete.

Life is full of ups and downs, positives and negatives, and they both must coexist. Yesterday I had an amazing day where I was on fire, spiritually, mentally, and physically. Today was slow, rainy and low energy. Both are okay, and necessary. Most interestingly on my mind is how these concepts apply to business.

6 years ago someone called me impulsive, and it stuck with me. At first I thought it had a negative connotation, as in I do not put thought into my action. But now I think I have a much more nuanced understanding which will connect to the yin and yang. I have always felt I process a huge volume of data quickly, intellectually and emotionally, that others perceive. Based on this premise I act quickly when something clicks. I do not skip thinking, I compress it. I deeply trust my quick reads because it is built upon pattern recognition. This kind of intelligence works faster than pure analytical reasoning. I think this is why I have always been good at math as well. When someone says I am impulsive they are misinterpreting speed as shallowness when it is actually depth operating efficiently. My impulses come from excitement, curiosity, and creativity. I feel a deep fast moving order that is hard to explain.

How this relates to business is as follows. When you make your first sale on your own, sell something you made, you are super excited. It is proof that what you are making matters. The excitement is pure and can be conflated with greed if you are not careful. The natural reaction is you want to make more sales, more money. For me it is not solely for the money, but for the creative response that a sale can make. To create something, to better the life of someone else. Of course the money is nice and can be used as a tool for the future. So the natural "impulsive decision" is to try and make as many sales and money as quickly as possible. I have quickly realized that this innate nature is not the best for new businesses. The ratzo (running) is the impulse, the creative energy that closes that first sale. The shov (returning) is the grounding, reflection, structure. It is the energy to slow down a process to refine it, to perfect it, and most importantly, to make it palatable to a customer. Without shov, ratzo burns out. Without ratzo, shov stagnates. The art is keeping both alive in the balance, in the yin and yang.

The key takeaway is the energy that starts a business is not the same energy that scales it. The early drive is vital, but to alchemize that drive and instinct you need patience and reflection.`,
    images: []
  },
  {
    id: 'arriving-in-bocas-del-toro',
    title: 'Arriving in Bocas del Toro, Panama',
    date: 'November 2, 2025',
    location: 'Bocas del Toro, Panama',
    slug: 'arriving-in-bocas-del-toro',
    year: '2025',
    excerpt: 'First impressions of Panama - from land border crossings to viber cafes and discovering what makes a place feel like home.',
    content: `Lovely readers, I have just arrived in the southernmost country of Central America, Panama. A country that is typically overlooked in the ire of travelers, but do I have some treats to tell you! Kyle and I arrived to Bocas del Toro yesterday afternoon by land and boat. From Puerto Viejo, CR. Bocas del Toro is an island archipelago off the north east coast of Panama. I have never heard of this place until recently, when talking with my Panamanian from Jacobo. I have done land boarder crossings, 3 times now, Thailand -> Laos, Laos -> Cambodia, and now Costa Rica -> Panama. It always shocks me that even thought there is some fictions line in the sand border between two places, you can immediately feel the cultural differences. Costa Rica is known for the "Pura Vida" lifestyle. To put it bluntly that just means they are a bunch of rasta hippies. It is really cool and chill in some regards, but from a cultural standpoint it is kind of bland, in food and in spirit. Coming to Panama, even though I have only been here for 24 hours, I feel a change. Walking around the main town of Bocas del Toro I really enjoyed it. There are lots of viber cafes and a community field. The locals and the tourists are intermingled. In Costa Rica, it kinda feels like hippie westerners took over and the Ticos are cool with it. I like places that are culturally rich and authentic, but also have the positive western influences. To this point I really love viber cafes. Cute cafes where you can get Kombucha, Matcha, nice seating, work, and hang with other vipers. Obviously this is a western import into these backpacking hubs. But slowly I have realized it really impacts my likings of the community. Bocas del Toro reminds me of a Siargao. As time goes a long here I will report back. But all of this is coming to mind as I explore where I want to live and give a real shot at settling down. It is a little cheaper in Panama compared to Costa Rica which is interesting. So the things that matter to be in choosing a place are : Weather, Cost of Living, Culture, Activities, Walkability, and viber cafes.`,
    images: []
  }
] as const
