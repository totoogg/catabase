# React + TypeScript + Vite

## Before optimization (sort)

- Component Table rendering duration - 65.9ms
- Total rendering duration - 1151.9ms

![before optimization flamegraph](./profile/sort1.png)
![before optimization ranked](./profile/sort2.png)

## Before optimization (select)

- Component Table rendering duration - 62.3ms
- Total rendering duration - 1243.3ms

![before optimization flamegraph](./profile/select1.png)
![before optimization ranked](./profile/select2.png)

## Before optimization (search)

- Component Table rendering duration - 69.4ms
- Total rendering duration - 1224.1ms

![before optimization flamegraph](./profile/search1.png)
![before optimization ranked](./profile/search2.png)

## Before optimization (add column)

- Component Table rendering duration - 1119.2ms
- Total rendering duration - 3072.6ms

![before optimization flamegraph](./profile/add1.png)
![before optimization ranked](./profile/add2.png)

## Before optimization (remove column)

- Component Table rendering duration - 82.7ms
- Total rendering duration - 1649.1ms

![before optimization flamegraph](./profile/remove1.png)
![before optimization ranked](./profile/remove2.png)

## After optimization (sort)

- Component Table rendering duration - 63ms
- Total rendering duration - 74.9ms

![after optimization flamegraph](./profile/sort3.png)
![after optimization ranked](./profile/sort4.png)

## After optimization (select)

- Component Table rendering duration - 0ms
- Total rendering duration - 140ms

![after optimization flamegraph](./profile/select3.png)
![after optimization ranked](./profile/select4.png)

## After optimization (search)

- Component Table rendering duration - 0ms
- Total rendering duration - 16.4ms

![after optimization flamegraph](./profile/search3.png)
![after optimization ranked](./profile/search4.png)

## After optimization (add column)

- Component Table rendering duration - 166.4ms
- Total rendering duration - 728.1ms

![after optimization flamegraph](./profile/add3.png)
![after optimization ranked](./profile/add4.png)

## After optimization (remove column)

- Component Table rendering duration - 92.6ms
- Total rendering duration - 491.9ms

![after optimization flamegraph](./profile/remove3.png)
![after optimization ranked](./profile/remove4.png)

## Conclusion

Optimization reduced overall rendering time by **_~50%_**
