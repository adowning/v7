import Parse, { User } from "parse";
import { prop, model } from "vue-parse";

@model("Todo")
export default class Todo extends Parse.Object {
    @prop() public title: string | undefined;
    @prop() public author: User | undefined;
    @prop() public finished: boolean | undefined;
}
