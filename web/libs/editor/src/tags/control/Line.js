import { types } from "mobx-state-tree";
import Registry from "../../core/Registry";
import { customTypes } from "../../core/CustomTypes";
import { PolygonModel } from "./Polygon";

/**
 * The `Line` tag is used to add lines with two points and an optional arrow pointer for the
 * last point. The parameters are mostly the same as those of the Polygon control tag. We
 * override the default opacity and colour here with other default values and added a flag to
 * show an arrow.
 */

const TagAttrs = types.model({
  opacity: types.optional(customTypes.range(), "0.9"),
  fillcolor: types.optional(customTypes.color, "#ff0000"),
  strokecolor: types.optional(customTypes.color, "#ff0000"),
  arrow: types.optional(types.boolean, false),
});

const Model = types
  .model({
    type: "line",
  })
  .volatile(() => ({
    toolNames: ["Line"],
  }));

const LineModel = types.compose("LineModel", PolygonModel, TagAttrs, Model);

const HtxView = () => null;

Registry.addTag("line", LineModel, HtxView);

export { HtxView, LineModel };
