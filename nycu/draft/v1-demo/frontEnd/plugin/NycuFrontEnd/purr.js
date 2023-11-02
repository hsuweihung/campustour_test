(()=>{
    "use strict";
    Symbol();
    const e = Symbol();
    const t = Object.getPrototypeOf
      , o = new WeakMap
      , n = e=>e && (o.has(e) ? o.get(e) : t(e) === Object.prototype || t(e) === Array.prototype)
      , r = (e,t=!0)=>{
        o.set(e, t)
    }
      , s = e=>"object" == typeof e && null !== e
      , c = new WeakMap
      , l = new WeakSet
      , a = (t=Object.is,o=((e,t)=>new Proxy(e,t)),a=(e=>s(e) && !l.has(e) && (Array.isArray(e) || !(Symbol.iterator in e)) && !(e instanceof WeakMap) && !(e instanceof WeakSet) && !(e instanceof Error) && !(e instanceof Number) && !(e instanceof Date) && !(e instanceof String) && !(e instanceof RegExp) && !(e instanceof ArrayBuffer)),i=(e=>{
        switch (e.status) {
        case "fulfilled":
            return e.value;
        case "rejected":
            throw e.reason;
        default:
            throw e
        }
    }
    ),d=new WeakMap,p=((e,t,o=i)=>{
        const n = d.get(e);
        if ((null == n ? void 0 : n[0]) === t)
            return n[1];
        const s = Array.isArray(e) ? [] : Object.create(Object.getPrototypeOf(e));
        return r(s, !0),
        d.set(e, [t, s]),
        Reflect.ownKeys(e).forEach((t=>{
            if (Object.getOwnPropertyDescriptor(s, t))
                return;
            const n = Reflect.get(e, t)
              , a = {
                value: n,
                enumerable: !0,
                configurable: !0
            };
            if (l.has(n))
                r(n, !1);
            else if (n instanceof Promise)
                delete a.value,
                a.get = ()=>o(n);
            else if (c.has(n)) {
                const [e,t] = c.get(n);
                a.value = p(e, t(), o)
            }
            Object.defineProperty(s, t, a)
        }
        )),
        s
    }
    ),u=new WeakMap,f=[1, 1],g=(r=>{
        if (!s(r))
            throw new Error("object required");
        const i = u.get(r);
        if (i)
            return i;
        let d = f[0];
        const w = new Set
          , v = (e,t=++f[0])=>{
            d !== t && (d = t,
            w.forEach((o=>o(e, t))))
        }
        ;
        let h = f[1];
        const m = e=>(t,o)=>{
            const n = [...t];
            n[1] = [e, ...n[1]],
            v(n, o)
        }
          , y = new Map
          , k = e=>{
            var t;
            const o = y.get(e);
            o && (y.delete(e),
            null == (t = o[1]) || t.call(o))
        }
          , b = Array.isArray(r) ? [] : Object.create(Object.getPrototypeOf(r))
          , E = {
            deleteProperty(e, t) {
                const o = Reflect.get(e, t);
                k(t);
                const n = Reflect.deleteProperty(e, t);
                return n && v(["delete", [t], o]),
                n
            },
            set(o, r, i, d) {
                const p = Reflect.has(o, r)
                  , f = Reflect.get(o, r, d);
                if (p && (t(f, i) || u.has(i) && t(f, u.get(i))))
                    return !0;
                k(r),
                s(i) && (i = (t=>n(t) && t[e] || null)(i) || i);
                let h = i;
                if (i instanceof Promise)
                    i.then((e=>{
                        i.status = "fulfilled",
                        i.value = e,
                        v(["resolve", [r], e])
                    }
                    )).catch((e=>{
                        i.status = "rejected",
                        i.reason = e,
                        v(["reject", [r], e])
                    }
                    ));
                else {
                    !c.has(i) && a(i) && (h = g(i));
                    const e = !l.has(h) && c.get(h);
                    e && ((e,t)=>{
                        if (y.has(e))
                            throw new Error("prop listener already exists");
                        if (w.size) {
                            const o = t[3](m(e));
                            y.set(e, [t, o])
                        } else
                            y.set(e, [t])
                    }
                    )(r, e)
                }
                return Reflect.set(o, r, h, d),
                v(["set", [r], i, f]),
                !0
            }
        }
          , S = o(b, E);
        u.set(r, S);
        const j = [b, (e=++f[1])=>(h === e || w.size || (h = e,
        y.forEach((([t])=>{
            const o = t[1](e);
            o > d && (d = o)
        }
        ))),
        d), p, e=>{
            w.add(e),
            1 === w.size && y.forEach((([e,t],o)=>{
                if (t)
                    throw new Error("remove already exists");
                const n = e[3](m(o));
                y.set(o, [e, n])
            }
            ));
            return ()=>{
                w.delete(e),
                0 === w.size && y.forEach((([e,t],o)=>{
                    t && (t(),
                    y.set(o, [e]))
                }
                ))
            }
        }
        ];
        return c.set(S, j),
        Reflect.ownKeys(r).forEach((e=>{
            const t = Object.getOwnPropertyDescriptor(r, e);
            "value"in t && (S[e] = r[e],
            delete t.value,
            delete t.writable),
            Object.defineProperty(b, e, t)
        }
        )),
        S
    }
    ))=>[g, c, l, t, o, a, i, d, p, u, f]
      , [i] = a();
    function d(e={}) {
        return i(e)
    }
    function p(e) {
        const t = c.get(e);
        return null == t ? void 0 : t[1]()
    }
    function u(e, t, o) {
        const n = c.get(e);
        let r;
        const s = []
          , l = n[3];
        let a = !1;
        const i = l((e=>{
            s.push(e),
            o ? t(s.splice(0)) : r || (r = Promise.resolve().then((()=>{
                r = void 0,
                a && t(s.splice(0))
            }
            )))
        }
        ));
        return a = !0,
        ()=>{
            a = !1,
            i()
        }
    }
    Symbol();
    const f = new WeakMap
      , g = new WeakMap
      , w = (e,t)=>{
        const o = f.get(e);
        o && (o[0].forEach((t=>{
            const {d: o} = t;
            e !== o && w(o)
        }
        )),
        ++o[2],
        t && o[3].add(t))
    }
      , v = (e,t)=>{
        const o = f.get(e);
        return !!(null == o ? void 0 : o[2]) && (o[3].add(t),
        !0)
    }
      , h = e=>{
        const t = f.get(e);
        t && (--t[2],
        t[2] || (t[3].forEach((e=>e())),
        t[3].clear()),
        t[0].forEach((t=>{
            const {d: o} = t;
            e !== o && h(o)
        }
        )))
    }
      , m = e=>{
        const {s: t, d: o} = e;
        let n = g.get(o);
        n || (n = [new Set],
        g.set(e.d, n)),
        n[0].add(e);
        let r = f.get(t);
        if (!r) {
            const e = new Set
              , o = u(t, (o=>{
                e.forEach((e=>{
                    const {d: n, c: r, n: s, i: c} = e;
                    t === n && o.every((e=>1 === e[1].length && c.includes(e[1][0]))) || e.p || (w(t, r),
                    s ? h(t) : e.p = Promise.resolve().then((()=>{
                        delete e.p,
                        h(t)
                    }
                    )))
                }
                ))
            }
            ), !0);
            r = [e, o, 0, new Set],
            f.set(t, r)
        }
        r[0].add(e)
    }
      , y = e=>{
        const {s: t, d: o} = e
          , n = g.get(o);
        null == n || n[0].delete(e),
        0 === (null == n ? void 0 : n[0].size) && g.delete(o);
        const r = f.get(t);
        if (r) {
            const [o,n] = r;
            o.delete(e),
            o.size || (n(),
            f.delete(t))
        }
    }
    ;
    function k(e, t) {
        const o = (null == t ? void 0 : t.proxy) || d({})
          , n = !!(null == t ? void 0 : t.sync)
          , r = Object.keys(e);
        return r.forEach((t=>{
            if (Object.getOwnPropertyDescriptor(o, t))
                throw new Error("object property already defined");
            const s = e[t];
            let c = null;
            const l = ()=>{
                if (c) {
                    if (Array.from(c).map((([e])=>v(e, l))).some((e=>e)))
                        return;
                    if (Array.from(c).every((([e,t])=>p(e) === t.v)))
                        return
                }
                const e = new Map
                  , a = s((t=>(e.set(t, {
                    v: p(t)
                }),
                t)))
                  , i = ()=>{
                    e.forEach(((e,s)=>{
                        var a;
                        const i = null == (a = null == c ? void 0 : c.get(s)) ? void 0 : a.s;
                        if (i)
                            e.s = i;
                        else {
                            const c = {
                                s,
                                d: o,
                                k: t,
                                c: l,
                                n,
                                i: r
                            };
                            m(c),
                            e.s = c
                        }
                    }
                    )),
                    null == c || c.forEach(((t,o)=>{
                        !e.has(o) && t.s && y(t.s)
                    }
                    )),
                    c = e
                }
                ;
                a instanceof Promise ? a.finally(i) : i(),
                o[t] = a
            }
            ;
            l()
        }
        )),
        o
    }
    const b = e=>{
        if (e.includes(":")) {
            const t = e.split(":");
            return {
                eventModule: t[0],
                eventTitle: t[1]
            }
        }
        return {
            eventModule: void 0,
            eventTitle: e
        }
    }
      , E = e=>new Promise((t=>setTimeout(t, e)))
      , S = (e,t)=>{
        const o = d(t)
          , n = e=>u(o, e);
        if ("event" === e) {
            const t = e=>n((()=>{
                if (0 !== o.eventText.length)
                    if (o.eventText.includes(";"))
                        (t = o.eventText,
                        t.includes(";") ? t.split(";") : [t]).forEach((async t=>{
                            const {eventModule: o, eventTitle: n} = b(t);
                            o && e(o, n, void 0),
                            await E(100)
                        }
                        ));
                    else {
                        const {eventModule: t, eventTitle: n} = b(o.eventText);
                        e(t, n, void 0)
                    }
                var t;
                o.scene !== o.recordScene && (e(void 0, void 0, o.scene),
                o.recordScene = o.scene)
            }
            ));
            let r = [];
            const s = e=>n((()=>{
                e({
                    vLookAt: o.vLookAt,
                    hLookAt: o.hLookAt,
                    fov: o.fov
                })
            }
            ));
            return window.frontEnd = {
                ...window.frontEnd,
                [`${e}State`]: o,
                [`${e}Subscribe`]: e=>r.push(e),
                [`${e}MiddleWare`]: r,
                miniMapSubscribe: s
            },
            t(((e,t,n)=>{
                r.forEach((o=>{
                    o(e, t, n)
                }
                )),
                o.eventText = ""
            }
            )),
            o
        }
        return window.frontEnd = {
            ...window.frontEnd,
            [`${e}State`]: o,
            [`${e}Subscribe`]: n
        },
        o
    }
      , j = ()=>{
        if (document.getElementById("krpanoSWFObject")) {
            const e = document.getElementById("krpanoSWFObject").get("global")
              , t = e=>{
                document.getElementById("krpanoSWFObject").get("global").call("mainloadscene(" + e + ");")
            }
              , o = e=>{
                document.getElementById("krpanoSWFObject").get("global").call("looktohotspot(" + e + ");")
            }
              , n = (t,o,n,r=2)=>{
                const s = document.getElementById("krpanoSWFObject").get("global").get("view")
                  , c = t || s.vlookat
                  , l = o || s.hlookat
                  , a = n || s.fov;
                e.call(`tween(view.vlookat,${c},${r});tween(view.hlookat,${l},${r});tween(view.fov,${a},${r});`)
            }
              , r = (e,t)=>{
                document.getElementById("krpanoSWFObject").get("global")[e].getArray().forEach((e=>{
                    t && t(e)
                }
                ))
            }
              , s = e=>{
                r("hotspot", e)
            }
              , c = e=>{
                r("layer", e)
            }
              , l = (e,t)=>{
                e.onclick && (e.onclick_backup && "string" != typeof e.onclick || (e.onclick_backup = e.onclick,
                e.onclick = ()=>{
                    document.getElementById("krpanoSWFObject").get("global").call(e.onclick_backup),
                    t(e.onclick_backup)
                }
                ))
            }
              , a = (e,t)=>{
                const o = document.getElementById("krpanoSWFObject").get("global").get(`hotspot[${e}]`)
                  , n = document.getElementById("krpanoSWFObject").get("global").get(`hotspot[${t}]`);
                o && n && "ath atv rx ry rz width height".split(" ").forEach((e=>{
                    o[e] = n[e]
                }
                ))
            }
              , i = e=>{
                const t = document.getElementById("krpanoSWFObject").get("global");
                e.includes("video") ? t.get("action[showpanovideospots]").content = t.get("action[showpanovideospots]").content.replace(`set(hotspot[${e}].visible, true);`, `set(hotspot[${e}].visible, false);`) : e.includes("polygon") ? t.get("action[showpanopolygonalspots]").content = t.get("action[showpanopolygonalspots]").content.replace(`set(hotspot[${e}].visible, true);`, `set(hotspot[${e}].visible, false);`) : t.get("action[showpanopointspots]").content = t.get("action[showpanopointspots]").content.replace(`set(hotspot[${e}].visible, true);`, `set(hotspot[${e}].visible, false);`),
                t.get(`hotspot[${e}]`).visible = !1,
                t.get(`hotspot[${e}]`).muted = !0
            }
              , d = (e,t,o)=>{
                const n = document.getElementById("krpanoSWFObject").get("global")
                  , r = n.get(e).alpha
                  , s = 1e3 * o;
                let c = null;
                const l = o=>{
                    c || (c = o);
                    const a = o - c
                      , i = Math.min(a / s, 1)
                      , d = r + (t - r) * i;
                    n.get(e).alpha = d,
                    i < 1 && requestAnimationFrame(l)
                }
                ;
                requestAnimationFrame(l)
            }
              , p = ()=>{
                const e = document.getElementById("krpanoSWFObject").get("global").events.createItem("showNameEvent");
                e.keep = !0,
                e.onnewscene = "jscall(window.krHelper.showName());"
            }
              , u = (e=!1)=>{
                window.krHelper.allHotspot((t=>{
                    const o = `jscall(console.log('${t.name} ${t.onclick}'));`;
                    "string" == typeof t.onclick && (e ? t.onclick = o : t.onclick += `();${o}`)
                }
                )),
                window.krHelper.allLayer((t=>{
                    const o = `jscall(console.log('${t.name} ${t.onclick}'));`;
                    "string" == typeof t.onclick && (e ? t.onclick = o : t.onclick += `();${o}`)
                }
                ))
            }
            ;
            return window.krHelper = {
                ...window.krHelper,
                krObj: e,
                goScene: t,
                goHotspot: o,
                allHotspot: s,
                allLayer: c,
                appendClick: l,
                replaceVideoSpotPosition: a,
                hideSpot: i,
                updateAlpha: d,
                showName: u,
                goLookAt: n,
                showNameEvent: p
            },
            S("event", {
                eventText: "",
                vLookAt: `${e.get("view.vlookat")}`,
                hLookAt: `${e.get("view.hlookat")}`,
                fov: `${e.get("view.fov")}`,
                scene: `${e.get("xml.scene")}`,
                recordScene: ""
            })
        }
        return window.krHelper = null,
        S("event", {
            eventText: "",
            vLookAt: "",
            hLookAt: "",
            fov: "",
            scene: "",
            recordScene: ""
        })
    }
      , $ = e=>new Promise(((t,o)=>{
        let n = document.createElement("link");
        n.rel = "stylesheet",
        n.href = e,
        n.onload = t,
        n.onerror = o,
        document.head.appendChild(n)
    }
    ))
      , O = (e,t=(()=>{}
    ))=>{
        const o = document.createElement("script");
        o.src = e,
        o.onload = ()=>{
            t && "function" == typeof t && t()
        }
        ,
        document.body.appendChild(o)
    }
      , A = (e,t=(()=>{}
    ))=>{
        const o = document.createElement("script");
        o.defer = !0,
        o.src = e,
        o.onload = ()=>{
            t && "function" == typeof t && t()
        }
        ,
        document.body.appendChild(o)
    }
    ;
    let W = "data:application/javascript;base64," + btoa("\nself.addEventListener('message', (e) => {\n  if(e.data==='hello'){\n    self.postMessage('hello');\n  }\n  debugger;\n  self.postMessage('');\n});\n");
    const M = e=>{
        let t = setInterval((()=>{
            new Promise((e=>{
                let t = !1
                  , o = new Worker(W);
                o.onmessage = n=>{
                    "hello" === n.data ? setTimeout((()=>{
                        t || (e(!0),
                        o.terminate())
                    }
                    ), 1) : (t = !0,
                    e(!1),
                    o.terminate())
                }
                ,
                o.postMessage("hello")
            }
            )).then((o=>{
                o && (e(),
                clearInterval(t))
            }
            ))
        }
        ), 1e3);
        return ()=>clearInterval(t)
    }
    ;
    let P;
    const x = ()=>{
        const e = (()=>{
            const e = new Date;
            return `${e.getFullYear().toString().slice(2)}${(e.getMonth() + 1).toString().padStart(2, "0")}${e.getDate().toString().padStart(2, "0")}`
        }
        )();
        return I + e
    }
    ;
    let I = "";
    let L;
    const T = ()=>{
        "function" == typeof L && L(),
        L = window.noGuardian ? ()=>{}
        : M((()=>{
            document.body.innerHTML = "",
            document.head.innerHTML = "",
            delete window.frontEnd,
            delete window.backEnd,
            delete window.guardian
        }
        )),
        ((e,t=(()=>{}
        ))=>{
            const o = e.toUpperCase().split("");
            let n = 0;
            P && document.removeEventListener("keydown", P),
            P = e=>{
                e.key.toUpperCase() === o[n] ? (n++,
                n === o.length && (t(),
                n = 0)) : n = 0
            }
            ,
            document.addEventListener("keydown", P)
        }
        )(x(), (()=>{
            alert("Stop guarding!"),
            L()
        }
        ))
    }
    ;
    window.valtio = {
        proxy: d,
        subscribe: u,
        snapshot: function(e, t) {
            const o = c.get(e)
              , [n,r,s] = o;
            return s(n, r(), t)
        },
        derive: k
    },
    window.frontEnd = {
        ...window.frontEnd,
        utils: {
            initState: S,
            addCss: $,
            addScript: O,
            addDeferScript: A,
            addPlugin: (e=[{
                name: "",
                serverHost: null,
                configSrc: null
            }])=>{
                const t = e=>{
                    e.serverHost && "http:" === location.protocol ? O(`${e.serverHost}/static/js/bundle.js`) : ($(`./frontEnd/plugin/${e.name}/static/css/main.css`),
                    A(`./frontEnd/plugin/${e.name}/static/js/main.js`))
                }
                ;
                e.forEach((e=>{
                    e.configSrc ? O(e.configSrc, (()=>{
                        t(e)
                    }
                    )) : t(e)
                }
                ))
            }
            ,
            initKrState: j
        }
    },
    window.onEvent = e=>{
        window.frontEnd.eventState.eventText = e
    }
    ,
    window.delay = E,
    window.guardian = {
        key: e=>"string" == typeof e ? (I = e,
        "updated!") : "type error, you should input a string for the key!",
        start: T
    },
    j(),
    T()
}
)();
