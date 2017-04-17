---
layout:     post
comments:   false
title:      Styling the LocomotiveCMS Admin Area
date:       2015-01-11 22:47:00
summary:    Implementing custom CSS in the LocomotiveCMS backoffice.
categories: rails
---

I've recently been toying with [LocomotiveCMS](http://locomotivecms.com/) as a WordPress replacement. While it doesn't go the whole way to replacing all functionality in present in WordPress, it is a worthy (although slimmer) replacement if you prefer to stick with Rails and prefer all the other goodies that come along with running a Rails stack. It initially seems that you'll need to fork[!] the project in order to implement any style changes for the admin area but digging through the source revealed [this file](https://github.com/locomotivecms/engine/blob/master/app/views/locomotive/shared/_main_app_head.html.haml):

`app/views/locomotive/shared/_main_app_head.html.haml`

{% highlight ruby %}
- # this partial can be overridden in the main app in order to include extra css or js
{% endhighlight %}

Create a file with this path in your LocomotiveCMS engine project with the following contents:

{% highlight ruby %}
- if admin_css = @current_site.theme_assets.detect{ |asset| asset[:source_filename] == 'locomotive-admin.css' }
  %link{ rel: :stylesheet,
         type: :"text/css",
         cross_origin: :anonymous,
         href: admin_css.source }
{% endhighlight %}

If a `locomotive-admin.css` file exists within your LocomotiveCMS theme assets then this will be appended to the end of the `<head>` tag in the admin area.
