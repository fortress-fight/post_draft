// 实现依赖收集

class Dependence_manager {
    constructor() {
        // 存放依赖项
        this.dependence_array = new Set();
    }

    // 添加依赖
    depend() {
        if (Dependence_manager.target) {
            this.dependence_array.add(Dependence_manager.target);
        }
    }

    // 添加发布行为
    notify() {
        this.dependence_array.forEach(function(dependence) {
            dependence();
        });
    }
}

class Observable {
    constructor(obj) {
        const keys = Object.keys(obj);
        keys.forEach(key => {
            this.define_reactive(obj, key, obj[key]);
        });
        return obj;
    }
    define_reactive(obj, key, val) {
        const dependence_manager = new Dependence_manager();

        Object.defineProperty(obj, key, {
            get() {
                dependence_manager.depend();
                console.log("get", key);
                return val;
            }
        });
        if (Array.isArray(val)) {
            Object.defineProperty(val, "push", {
                value() {
                    this[this.length] = arguments[0];
                    dependence_manager.notify(arguments[0]);
                }
            });
        } else {
            Object.defineProperty(obj, key, {
                set(new_value) {
                    val = new_value;
                    dependence_manager.notify();
                }
            });
        }
    }
}

class Watcher {
    constructor(obj, key, cb, on_computed_update) {
        this.obj = obj;
        this.key = key;
        this.cb = cb;
        this.on_computed_update = on_computed_update;
        this.define_computed();
    }
    define_computed() {
        const self = this;
        let result;
        Dependence_manager.target = () => {
            result = self.cb();
            this.on_computed_update(result);
        };
        result = self.cb();

        Object.defineProperty(self.obj, self.key, {
            get() {
                Dependence_manager.target = null;
                return result;
            },
            set() {
                console.error("计算属性无法被赋值！");
            }
        });
    }
}

let observable_people = new Observable({
    name: "小明",
    age: 22,
    info: ""
});

new Watcher(
    observable_people,
    "info",
    function() {
        let info = observable_people.name + "今年：" + observable_people.age;
        console.log("info 发生了修改：", info);
        return info;
    },
    function(new_value) {
        console.log("complete:", new_value);
    }
);

observable_people.name = "小白";
