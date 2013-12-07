# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'sleek_charts/version'

Gem::Specification.new do |spec|
  spec.name          = "sleek_charts"
  spec.version       = SleekCharts::VERSION
  spec.authors       = ["Gourav Tiwari"]
  spec.email         = ["gouravtiwari21@gmail.com"]
  spec.homepage    = "https://github.com/gouravtiwari/sleek_charts"
  spec.summary     = "Basic charts based on d3 & d3-tip with consistent tooltips"
  spec.description = "Basic charts based on d3 & d3-tip with consistent tooltips for all charts"
  spec.license       = "MIT"

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.3"
  spec.add_development_dependency "rake"
end
