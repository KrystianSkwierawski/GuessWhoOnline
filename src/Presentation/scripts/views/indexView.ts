import { elements, elementStrings } from './base.js';

export const showFindMatchContainer = function (): void {
    elements.findMatch.classList.add('find-match_active');
};

export const hideFindMatchContainer = function (): void {
    elements.findMatch.classList.remove('find-match_active');
};

export const showCreateMatchContainer = function (): void {
    elements.createMatch.classList.add('create-match_active');
};

export const hideCreateMatchContainer = function (): void {
    elements.createMatch.classList.remove('create-match_active');
};


