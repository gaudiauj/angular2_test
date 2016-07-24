import { Component } from '@angular/core';
@Component({
    template: `<h1>{{title}}</h1> 
    <div>
        <span>{{heroes.yoman.name}} : {{heroes.yoman.sayHI()}}</span>
        <label><input [(ngModel)]="heroes.yoman.name" placeholder="name"> name</label> 
        
    </div>
    <span>{{heroes.yowoman.name}}  : {{heroes.yowoman.sayHI()}}</span>
`,
    selector: 'my-app'
})
export class AppComponent {

    title = 'couco afau'
    heroes = {
        yoman: {
            name : 'yoman fezf ',
            sayHI : function() {
                return 'yo aezrferfa '+this.name
            }
        },
        yowoman: {
            name : 'yowoman',
            sayHI : function() {
                return 'yo'+this.name
            }
        }
    }

    constructor () {
        console.log('youhazdzaou')
    }
}

