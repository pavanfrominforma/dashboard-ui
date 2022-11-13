import { Injectable } from "@angular/core";
import {
    NAVBAR_POSITION,
    NAVBAR_POSITION_CLOSED,
    NAVBAR_POSITION_OPEN,
} from "../utils/keys.utils";

/**
 * Works for localStorage
 */
@Injectable({
    providedIn: "root",
})
export class LocalService {
    constructor() {}

    toggleNavPostion() {
        const currentPosition = localStorage.getItem(NAVBAR_POSITION);
        const newPosition =
            currentPosition == NAVBAR_POSITION_OPEN
                ? NAVBAR_POSITION_CLOSED
                : NAVBAR_POSITION_OPEN;
        localStorage.setItem(NAVBAR_POSITION, newPosition);
        return newPosition;
    }

    isNavOpen() {
        const position = localStorage.getItem(NAVBAR_POSITION);
        return position == NAVBAR_POSITION_OPEN;
    }
}
