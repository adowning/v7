import Parse, { User } from "parse";
import { prop, model } from "vue-parse";

@model("Event")
export default class EventLog extends Parse.Object {
    @prop() public employee: User | undefined;
    @prop() public objectId: string | undefined;
    @prop() public eventType: string | undefined;
    @prop() public details: Object | undefined;
}
