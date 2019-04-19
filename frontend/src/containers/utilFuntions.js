import React, { Component } from 'react';
import Contacts from './Contacts'
import Groups from './Groups';
import Templates from './Templates';
import NewEmail from './NewEmail';
import SentEmail from './SentEmail'

export function navContent(state, stateChange) {
    switch (state.navbar) {
        case 'Contacts':
            return (
                <Contacts />
            );
        case 'Groups':
            return (
                <Groups />
            );
        case 'SentEmail':
            return (
                <SentEmail />
            );
        case 'Template':
            return (
                <Templates />
            );
        case 'NewEmail':
            return (
                <NewEmail handleStateChange={stateChange} />
            )
        default:
            return (
                <Contacts />
            )
    }
}

export function addBorderClass(state, category) {
    if (state.navbar==category) {
        var classes = 'nav-span border-bottom-class'
       
    } else {
        var classes = 'nav-span'
    }
    return (
        <span data-section={category} className={classes}>{category}</span>
    )
}