import React, { Component } from 'react';
import Contacts from './Contacts'
import Groups from './Groups';
import Templates from './Templates';

export function navContent(state) {
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
                <div>
                    List of sent Emails
                </div>
            );
        case 'Template':
            return (
                <Templates />
            );
        case 'NewEmail':
            return (
                <div>
                    New Email form.
                </div>
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