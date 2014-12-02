/*
 * build pages ( based on simple include rule )
 */

var fs = require('fs'),
    path = require('path');

// cache
var cache = {
    storage: {},
    register: function(name, getter){
        var upperName = name.slice(0, 1).toUpperCase() + name.slice(1),
            getMethod = 'get' + upperName,
            setMethod = 'set' + upperName;

        var storage = this.storage[name] = this.storage[name] || {};
        this[getMethod] = function(key, refresh){
            storage[key] = (refresh || !(key in storage)) ? getter.apply(this, arguments) : storage[key];
            return storage[key];
        };
        this[setMethod] = function(key, value){
            storage[key] = value;
            return storage[key];
        };
    }
};

// get file content
cache.register('content', function(filePath){
    return fs.readFileSync(filePath, 'utf8');
});

// get file status
cache.register('stat', function(filePath){
    return fs.statSync(filePath);
});

// get path ls
cache.register('ls', function(folder){
    return fs.readdirSync(folder).map(function(name){
        var p = path.join(folder, name),
            stat = cache.getStat(p);
        return {
            name: name,
            path: p,
            isFile: stat.isFile()
        };
    });
});

// ext helpers

var setExt = function(fileName, ext){
    return fileName.replace(/(\.\w+){0,1}$/, '.' + (ext || 'js'));
};

var removeExt = function(fileName){
    return fileName.replace(/(\.\w+){0,1}$/, '');
};

// config

var basePath = __dirname,
    currPath = process.cwd(),
    commonPath = path.join(basePath, 'common'),
    pagePath = path.join(basePath, 'page'),
    distPath = path.join(currPath, '');

var includePattern = /<\%\s*include\s*\"([^\"]+)\"\s*\%\>/g;

// resolve method

// get absolute path with self-path & rel-path
var resolvePath = function(filePath, relPath){
    return path.resolve(path.dirname(filePath), relPath);
};

// get resolved content
cache.register('resolvedContent', function(filePath){
    var cnt = cache.getContent(filePath);

    return cnt.replace(includePattern, function(_, include){
        include = resolvePath(filePath, include);
        include = setExt(include, 'html');
        return cache.getResolvedContent(include);
    });
});

// main method

var build = function(){
    var pageList = cache.getLs(pagePath);

    pageList.forEach(function(item, i){
        if(item.isFile){
            var distFilePath = path.join(distPath, item.name);
            var resolvedContent = cache.getResolvedContent(item.path);

            fs.writeFileSync(distFilePath, resolvedContent);

            console.log('*', 'Genned:', item.name, '\t->', distFilePath);
        }
    });

    console.log('>', 'Finished.');
};

build();