import Parse, { User } from "parse";
import { prop, model } from "vue-parse";

@model("Timecard")
export default class Timecard extends Parse.Object {
    @prop() public employee: User | undefined;
    @prop() public approved: boolean | undefined;
    @prop() public clockInTime: Date | undefined;
    @prop() public clockOutTime: Date | undefined;
    @prop() public status: Number | undefined;
}
