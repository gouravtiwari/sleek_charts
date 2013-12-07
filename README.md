# SleekCharts

Provides Bar and Donut charts with consitent tooltip for Rails applications.

## Supports Rails 3.1+

## Installation

Add this line to your application's Gemfile:

    gem 'sleek_charts'

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install sleek_charts

Once done, add below to application's assets/javascripts/application.js file
    //= require sleek_charts

Also, add below to application's assets/stylesheets/application.css file
    *= require sleek_charts

## Usage

Simply add bar chart to any element, e.g.

    barTip(options);
    //where options is a map, checkout bar-tip.js

or add donut chart to any element, e.g.

    donutTip(options);
    //where options is a map, checkout donut-tip.js


## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
