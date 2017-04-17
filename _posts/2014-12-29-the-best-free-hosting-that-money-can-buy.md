---
layout:     post
comments:   true
title:      The Best Free Hosting that Money can Buy
date:       2014-12-29 15:21:00
summary:    Managed infrastructure, SSL certificates, DNS, and email on a shoestring.
categories: infrastructure
---

Free services have moved on drastically since the early 2000's wasteland of GeoCities and "Free 25MB FTP". Growing up being interested in websites, web services and all things web, while also not being an adult with a bank account and credit card meant that options were limited. I've recently realised that I'm effectively running my whole personal web-stack on free services and it is genuinely awesome in contrast to what used to be out there a decade ago. The world has moved on from shady russian webhosts with almost-zero bandwidth allowance to being able to run production-ready single page apps for free. Admittedly, compute and database resource is difficult to find in quantity for free but thanks to caching, and depending on traffic, you may just be able to get away with it.

Will you be able to serve 10 million visitors a month on free static hosting? Probably. What about running an API as well? Bit more difficult.

## Static Hosting
Static hosting refers to any of your front-end assets, so your HTML, CSS, and JavaScript. People mostly think of blogs and portfolios when they think of static hosting but this also extends to single page apps. If you are building a third-party app that only consumes someone elses API, such as a Google Maps service or a Twitter reader then you'll sit squarely within this category. You can get away with a lot for free when it comes to static hosting so if your single page app (or site) lives is purely static then I'd see how you fare on these free services before moving on to paid.

There's one big player here and I think most people will already know what's coming.

### GitHub Pages

[GitHub pages](https://pages.github.com/) seems to be the industry-standard for free static hosting. It's what this site is running on, and if I was a front-end developer chruning out many a landing page or simple static site then it is without a doubt what I'd be using. Being ran by GitHub you can be sure that the infrastructure is solid, the uptime is great and even as a free service, it most likely isn't going away any time soon. There's a prerequisite of knowing git but in my opinion everyone should be using it anyway. [Jekyll](http://jekyllrb.com/) is supported out of the box and with [unlimited sites](https://help.github.com/articles/user-organization-and-project-pages/#project-pages) and [basically unlimited bandwidth](https://www.quora.com/What-are-bandwidth-and-traffic-limits-for-GitHub-pages/answer/Zach-Holman) there really isn't much reason not to be using this.

In my experience, the only issues that I have seen is that SSL support with a custom domain is [ropey](https://github.com/isaacs/github/issues/156). Using a custom domain at the root/apex level used to be slow, but this [seems to have been fixed](http://instantclick.io/github-pages-and-apex-domains).

### Divshot

Notable mention going out to [Divshot](https://divshot.com/), which seems to be the Heroku of single page apps. I can't vouch for them personally as I haven't used them beyond the account I just created for this blog but if you've used Heroku before then you'll be comfortable with the workflow. The limits on the free account are a bit more restrictive than GitHub's but if you have a strong enough reason to avoid GitHub then it doesn't seem like a bad option. If you already keep all your code in private repositories, this workflow may suit you more.

## Rails Hosting

It's here where you'll start to notice that you might just not quite get everything you need for free. Compute and database resource is much more costly to provide than just storage space so you'll find that the limits are a lot more harsh than with the static hosting. With that being said, you should be able to host low traffic sites without much issue, although I'd definitely keep it to the personal 'pet project' variety.

### Heroku

This was the first [PaaS](https://en.wikipedia.org/wiki/Platform_as_a_service) that I used for Rails and I haven't looked back since. Even thinking about hand-rolling a full server stack for a single Rails project now gives me the creeps. If you're currently managing your own Rails servers on DigitalOcean or Rackspace then definitely give this a shot. The headaches of package updates & management, web server configuration, security, and database management are all handed over to Heroku. Think of it as outsourcing your server admin while obliterating the need for you to double up as DevOps.

On the free tier you get as many projects as you want each limited to:

* 512MB RAM
* 1 vCPU
* 10,000 rows of Postgres storage

The free database tier comes with up to 4 hours of downtime a month and while I've never noticed it, I doubt you'd want a critical client site going down for half a working day because you've cheaped out on database hosting. I could write an essay on the wonders of Heroku but I'll leave that for another day.

### OpenShift

OpenShift is RedHat's PaaS offering and much like a lot of RedHat's services, it's geared heavily to enterprise. Their [free tier](https://www.openshift.com/products/pricing) is surprisingly competitive, allowing you to run two application servers and one database server concurrently. Custom domains are available as is 1GB of [persistent storage](https://help.openshift.com/hc/en-us/articles/202398490-Persistant-storage-for-OpenShift-applications).

The main downside to all of this was the lack of new Rubies to play with. By default you're stuck with [Ruby 2.0 at best](https://developers.openshift.com/en/ruby-overview.html), which I find pretty disappointing but this is probably a side-effect of their enterprise focus. For those that enjoy living on the bleeding edge with minimal effort then this one may not be for you.

[gosukiwi has pointed out](http://jack.codes/infrastructure/2014/12/29/the-best-free-hosting-that-money-can-buy/#comment-1763400670) that it is possible to use newer versions of Ruby, along with something more advanced than the default Apache (+Passenger) stack through the use of [cartridges](https://developers.openshift.com/en/get-involved-extend-openshift.html). This requires a bit of manual labour to get setup to your liking but with Docker support on the horizon, this should get a little easier in future.

### Ninefold

The honourable mention, or one to watch in the Rails hosting category goes to [Ninefold](https://ninefold.com/). They are currently running a [free-tier promo](http://help.ninefold.com/reference/faq/#how-does-the-free-tier-work) offering $50 a month off your bill when you add your payment details. This equates to 1.5GB RAM, 1 vCPU, 25GB of database hosting and 14GB of bandwidth per month although you'll only get the one application server. I can't see the free-tier promo lasting forever so I'd tread with caution if you plan on setting up a long term project.

## CDN

A CDN effectively sits in-front of your site serving static assets and reducing the load on your host. When using a service like GitHub pages, a CDN will optimize and serve most of your content. This content is distributed to servers around the world meaning that visitors connect to a server that is nearest to them, reducing load time. CDN's will typically offer features such as mobile image optimization and DDOS protection.

### CloudFlare

If you are going to take away one free service from this blog post then let it be [CloudFlare](https://www.cloudflare.com/). I've been hammering it at work and for good reason; free SSL certificates, asset caching and DDOS protection. Point your name servers to CloudFlare, setup your DNS records and you're good to go.

We recently ran a one-day trial of one our Rails apps, using CloudFlare as a CDN. Out of a total 22,650 requests, 5,886 were served directly by CloudFlare's network. So that's 25.98% of all requests didn't even hit our Rails instances. For free. Not only that, but these requests have been optimized, minified and delivered from an edge location to increase speed. Since the apps we deliver are constatly battling limited bandwith and mobile data allowances, this is an excellent quick-win.

Much like GitHub pages it comes overwhelmingly recommended but I would look out for one thing; Free SSL certificates are not supported in [Android 2.3 and Internet Explorer on XP](https://support.cloudflare.com/hc/en-us/articles/203274000-Does-CloudFlare-s-free-Universal-SSL-have-limitations-). The partial GitHub SSL support can be eased using [Flexible SSL](https://support.cloudflare.com/hc/en-us/articles/200170416-What-do-the-SSL-options-Off-Flexible-SSL-Full-SSL-Full-SSL-Strict-mean-) - the connection from CloudFlare to the end-user will be encrypted, but the connection from GitHub to CloudFlare won't be. If you're planning on running the next version of RiseUp then I'd take the time to [consider some of the criticism](https://news.ycombinator.com/item?id=8382423) of the architechture and implementation of the free SSL, but for static sites, public blogs and portfolios I wouldn't concern yourself.

## DNS

DNS is the address book of the internet, when you type in a URL to your browser you connect to your DNS server and it fetches the correct IP address to open a connection to. If your looking for a DNS provider, I'd just stick with CloudFlare but if this isn't an option then there's still one very good free provider that I'm aware of.

### Namecheap

Without a doubt the best registrar I have used to date, and I've been through a few. Support is fantastic, as is pricing. The admin area isn't quite a slick as the rest of the site but this is forgivable and if you've used anything like 1&1 or 123-Reg you should still be pleasantly surprised. A lot of people don't know that Namecheap offer [free DNS hosting](https://www.namecheap.com/domains/freedns.aspx) as an incentive to sign up for paid services but it has worked for me and I'm sure it has for countless others. If you already own a domain and don't have a suitable place to set DNS records then this might help you out. There's not as much of the fancy DNS wizardry offered by CloudFlare but there is support for all common record types so you won't go too far wrong.

## Email

Suitable free and feature complete email can be a challenge when using custom domains. If your registrar doesn't offer much in the way of email you can feel a bit out of luck but thankfully there are a couple of options available:

### Mailgun

There's a good chance that you won't have heard of Mailgun and that's because it doesn't fit within the personal email provider market. It's more akin to a transactional email service such as Mandrill than it is to GMail or Outlook. Mailgun provides one excellent free service; forwarding of email. The first 10,000 emails per month are free and you have the ability to add up to [1,000](https://help.mailgun.com/hc/en-us/articles/203068914-What-are-the-differences-between-free-and-paid-accounts-) custom domains if you add payment details (5 without).

Once you setup and verify your domain in Mailgun, you just need to set your MX DNS records to point to the ones you are given as part of the domain setup procedure. My forwarder (or Route as Mailgun calls it) is set up like:

* Priority: 0
* Filter Expression: catch_all()
* Actions: forward("address-that-i-never-reveal@gmail.com")

When an email arrives at *anything*@jack.codes it gets forwarded on to GMail where I can set up as many reply addresses as I need. Wildcard email forwarders allow me to accept and filer email at any address, so I can sign up for services that I'm cautious about using a unique email on my personal domain and filter as needed.

On this setup I can use ?@ for personal queries and $@ for professional enquiries. Useless but cool.

### Zoho

While I don't have any direct experience with this one, I have seen this recommended over at [/r/web_design](https://www.reddit.com/r/web_design). It appears that you get up to [10 mailboxes with a single custom domain](https://www.zoho.com/mail/zohomail-pricing.html) so this should be okay for a portfolio but it looks like you'll need to pay if you need more than just the one domain.

## That Money Can Buy?

Going back to the title, I consider the services listed to be as good as if not better than most of the paid hosting that I've used in the past. GitHub pages along with Cloudflare is buttery smooth and also as reliable as I've had elsewhere. The Mailgun email setup I'm using works as well as any paid email hosting I've used. You'll hit limits with application hosting but this is to be expected - maybe in 10 years time this will be as good as the static hosting available today.
