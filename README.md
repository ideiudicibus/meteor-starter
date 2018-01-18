Meteor Starter
==============

A Meteor boilerplate with a lot packed in. Originally written in Coffeescript.
This branche has been decaffeinated using:

[Decaffeinate Project](http://decaffeinate-project.org/)

[Tutorials](http://learn.meteorfactory.io/meteor-starter/)

[MIT License](http://choosealicense.com/licenses/mit/)


This 1.5-BRANCH is mantained by i.deiudicibus.


### Setup ####

```
git clone https://github.com/ideiudicibus/meteor-starter.git myapp
cd myapp
git checkout 1.5-BRANCH
meteor
```

### What's included ###
#### Visitors####
* Sexy landing page

####Users####
* Login / Sign up etc. from [Accounts Entry](https://github.com/Differential/accounts-entry)
* Sign in with Facebook etc. with automatic photo import
* Profile Page - add a photo, location and other fields defined in schema
* Have a username (or not)
* Change their password and delete their account

#### Admin ####
* Manage everything via an [admin dahsboard](https://github.com/yogiben/meteor-admin/) (go to `/admin`)

#### Interactions ####
* Create / edit posts with image upload
* Favorite / comment on posts

### Customisation ###
Detailed tutorails coming soon.

First steps:
* Edit basic setting in `/lib/_config/_config.coffee`
* Delete / modify HTML in `/client/views/home.html`
* Update colors in `/client/style/bootstrap-variables.less`
* Add / edit collections in `/collections/`
* Create routes and views in `/lib/router/router.coffee` and `/client/views` folder

### Docker ###
Dockerize it

for Dev

```
docker build -t myrepo/meteordev -f Dockerfile-dev .
```

Run

```
docker run -it -p 3000:3000 --rm myrepo/meteordev
```


for Prod

```
docker build -t myrepo/mymeteorapp .
```

Run it
```
docker run --name mongodb -d mongo
docker run -it --rm -p 3000:3000 --link mongodb:db -e "MONGO_URL=mongodb://db" -e "ROOT_URL=http://localhost:3000" myrepo/mymeteorapp
```

### what's in this fork ###
Meteor@1.6 
solves the 'bson' problem aka : meteor Error: Cannot find module 'bson' 
by using this comment
https://github.com/meteor/meteor/issues/7477#issuecomment-249743787
