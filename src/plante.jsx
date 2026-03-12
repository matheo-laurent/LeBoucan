import { useState } from 'react';
import React from 'react';

class Companion{
    Constructor(lvl = 1, entity = 'plant', form=1){
        this.lvl = lvl;
        this.entity = entity;
        this.form =1
    }

    getLvl(){
        return this.lvl;
    }

    getEntity(){
        return this.entity;
    }

    getForm(){
        return this.form;
    }

    setLvl(lvl){
        this.lvl = lvl
    }

    setEntity(entity){
        this.entity = entity
    }

    setForm(form){
        this.form = form;
    }

    lvlUp(){
        this.lvl +=1;
    }

    grow(){
        this.form += 1
    }

}

function App(){
    companion = new Companion();

    return
}