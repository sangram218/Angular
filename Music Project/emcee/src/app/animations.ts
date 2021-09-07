import { state,trigger,transition,useAnimation,animate,animation,style,keyframes} from '@angular/animations'

export let fadeInAnimation = animation([
    style({opacity:0}),
    animate(1000)
])

export let fadeOutAnimation = animation([
    style({opacity:1}),
    animate(1000,style({opacity:0}))
])

export let bounceOutLeftAnimation = animation(
    animate('0.5s ease-out',keyframes([
        style({
            offset:.2,
            opacity:1,
            transform : 'translateX(20px)'
        }),
        style({
            offset:1,
            opacity:0,
            transform : 'translateX(-100%)'
        }),
    ]))
)