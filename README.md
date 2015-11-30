## Ubuntu 14.04 setup

### Install ruby2.2
´´´
$ sudo apt-add-repository ppa:brightbox/ruby-ng
$ sudo apt-get update
$ sudo apt-get install ruby2.2 ruby2.2-dev
´´´

#### Check
´´´
$ ruby2.2 -v
# ruby 2.2.*
´´´


### Install Jekyll
´´´
$ sudo gem install jekyll
# Done installing documentation for ffi, rb-inotify, rb-fsevent, listen, jekyll-watch, sass, jekyll-sass-converter, rouge, colorator, safe_yaml, mercenary, kramdown, liquid, jekyll after 21 seconds
# 14 gems installed
´´´

#### Check
´´´
$ jekyll -v
# jekyll 3.0.1
´´´

### Clone website
´´´
$ git clone https://github.com/LacunaLab/lacunalab-website
$ cd lacunalab-website
´´´

### Run Jekyll
´´´
$ jekyll serve
# Configuration file: /home/deploy/devel/mar/lacunalab-website/_config.yml
#            Source: /home/deploy/devel/mar/lacunalab-website
#       Destination: /home/deploy/devel/mar/lacunalab-website/_site
# Incremental build: disabled. Enable with --incremental
#      Generating...
#                    done in 1.553 seconds.
# Auto-regeneration: enabled for '/home/deploy/devel/mar/lacunalab-website'
#Configuration file: /home/deploy/devel/mar/lacunalab-website/_config.yml
#    Server address: http://127.0.0.1:4000/
#  Server running... press ctrl-c to stop.
´´´
