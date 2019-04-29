// 实现依赖收集

class Dependence_manager {
    constructor() {
        // 存放依赖项
        this.dependence_array = new Set();
    }

    // 添加依赖
    depend(key) {
        if (Dependence_manager.target) {
            this.dependence_array.add({
                key: key,
                target: Dependence_manager.target
            });
            Dependence_manager.target = null;
        }
    }

    // 添加发布行为
    async notify(key) {
        this.dependence_array.forEach(function(dependence) {
            if (dependence.key == key) {
                dependence.target(key);
            }
        });
        await Dependence_manager.target_array.clear();
    }
}

Dependence_manager.target = null;
Dependence_manager.target_array = new Set();

class Observable {
    constructor(obj) {
        return this.define_reactive(obj);
    }
    define_reactive(obj) {
        const dependence_manager = new Dependence_manager();
        const handler = {
            get(target, key, receiver) {
                dependence_manager.depend(key);
                return Reflect.get(target, key, receiver);
            },
            set(target, key, value, receiver) {
                console.log(`我的${key}属性被修改为${value}了！`);
                Reflect.set(target, key, value, receiver);
                dependence_manager.notify(key);
            }
        };
        return new Proxy(obj, handler);
    }
}

class Watcher {
    constructor(obj, key, cb, on_computed_update) {
        this.obj = obj;
        this.key = key;
        this.cb = cb;
        this.on_computed_update = on_computed_update;
        return this.define_computed();
    }
    define_computed() {
        const self = this;
        let result;
        Dependence_manager.target = async key => {
            await console.log("watch");
            // console.log(Dependence_manager.target_array.keys(), key);
            if (!Dependence_manager.target_array.has(key)) {
                Dependence_manager.target_array.add(key);
                result = self.cb();
                self.on_computed_update(result);
            }
        };
        result = self.cb();

        return new Proxy(self.obj, {
            get(target, key, receiver) {
                if (key === self.key) {
                    return result;
                } else {
                    return Reflect.get(target, key, receiver);
                }
            },
            set(target, key, value, receiver) {
                if (key === self.key) {
                    console.error("计算属性无法被赋值！");
                } else {
                    return Reflect.set(target, key, value, receiver);
                }
            }
        });
    }
}

let observable_people = new Observable({
    name: "小明",
    age: 22,
    job: "student",
    info: ""
});

let observable_info_people = new Watcher(
    observable_people,
    "info",
    function() {
        let info = observable_people.name + "今年：" + observable_people.age;
        console.log("callback：", info);
        return info;
    },
    function(new_value) {
        console.log("complete:", new_value);
    }
);
let observable_job_people = new Watcher(
    observable_people,
    "job",
    function() {
        return observable_people.age < 18 ? "student" : "programmer";
    },
    function(new_value) {
        console.log(observable_people.name + "的职业是:", new_value);
    }
);

observable_people.name = "小白";
observable_people.age = 10;
observable_people.age = 15;
observable_people.age = 18;
observable_people.age = 20;
