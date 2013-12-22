(function () {
    var root = this;
    root.using = function (moduleString) {
        var getParts = function (moduleString) {
            var parts = moduleString.split(",");
            if (parts.length > 2) {
                throw new Error("Too many parts!");
            }
            var local = parts[parts.length - 1].trim();
            if (local === "") {
                throw new Error("Local part cannot be empty!");
            }
            return {
                domain: parts.length === 2 ? parts[0].trim() : "",
                local: local
            };
        };
        var parts = getParts(moduleString);
        var localSearch =
            parts.local.charAt(parts.local.length - 1) === "*" ?
            parts.local.substr(0, parts.local.length - 1) :
            parts.local;
        var lastFound = null;
        for (var key in root) {
            var p = getParts(key);
            if (p.domain === parts.domain && p.local.substr(0, localSearch.length) === localSearch) {
                root[parts.local.substr(localSearch.length)] = lastFound = root[key];
            }
        }
        if (lastFound === null) {
            throw new Error("Module not found!");
        }
        return lastFound;
    };
}).call(this);
