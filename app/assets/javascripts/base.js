function mergeConfigOptions(defaults,options){
    var mergedConfig = {};
    for (var attrname in defaults) { mergedConfig[attrname] = defaults[attrname]; }
    for (var attrname in options)  { mergedConfig[attrname] = options[attrname]; }
    return mergedConfig;
}
