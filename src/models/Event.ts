import Parse, { User } from "parse";
import { prop, model } from "vue-parse";

@model("Event")
export default class Event extends Parse.Object {
    @prop() public employee: User | undefined;
    @prop() public eventType: string | undefined;
    @prop() public details: Object | undefined;
}
