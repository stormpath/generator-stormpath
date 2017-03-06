#Stormpath is Joining Okta
We are incredibly excited to announce that [Stormpath is joining forces with Okta](https://stormpath.com/blog/stormpaths-new-path?utm_source=github&utm_medium=readme&utm-campaign=okta-announcement). Please visit [the Migration FAQs](https://stormpath.com/oktaplusstormpath?utm_source=github&utm_medium=readme&utm-campaign=okta-announcement) for a detailed look at what this means for Stormpath users.

We're available to answer all questions at [support@stormpath.com](mailto:support@stormpath.com).

# generator-stormpath

*Generate a Stormpath and Express web application that runs on Heroku.*

**UPDATE**: This library is no longer actively maintained. Sorry :(


## Purpose

So, you want to build an Express web app?  Great!  There's no better (*or more
awesome*) way to build an Express app than with [Stormpath][]!  Stormpath is an
API service that allows you to instantly add user accounts and security into
your web apps.  You can register new users, log them in, log them out, assign
groups and permissions, generate API keys, etc!

In short: it's totally awesome.

What this project gets you is a really nice, minimal, Express.js app with
Stormpath already plugged in.  And if you're a [Heroku][] user, you'll be able
to instantly deploy your app to Heroku as well!


## OK, LET'S DO THIS THEN!

Good, I'm glad you're on board!

To get started, you'll need to install a few [npm][] modules:

```console
$ sudo npm install -g yo generator-stormpath
```

Next, you've got to create a project directory -- this is where your code will
be located.  For example, if your site is going to be called yummyfood.com, you
might do this:

```console
$ mkdir yummyfood.com
$ cd yummyfood.com
```

Lastly, to use the stormpath generator, just run:

```console
$ yo stormpath
```

This will run the generator, and initialize your new project!


## Using

After you've bootstrapped your project in the previous section, you'll most
likely want to take a look at your project code.  This generator is pretty
minimal, so there's not much it comes with.

- `package.json` - Your package information.
- `index.js` - The 'starting point' of your Express app.  This holds your
  middleware configuration stuff.
- `routes/index.js` - Your routes.  Feel free to customize these however you
  want.

If you're using Heroku, you'll also have an additional file:

- `Procfile` - This tells Heroku how to run your app.

Now that you have this minimal skeleton app -- write your code and have fun!

To see what Stormpath is doing for your, read through our [Express-Stormpath][]
documentation as well =)


## Changelog

**Version 0.1.0**: *11/5/2014*

- First release!


  [Stormpath]: https://stormpath.com/ "Stormpath"
  [Heroku]: https://www.heroku.com/ "Heroku"
  [npm]: https://www.npmjs.org/ "npm"
  [Express-Stormpath]: https://docs.stormpath.com/nodejs/express/ "Express Stormpath"
