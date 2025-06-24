import { types } from "mobx-state-tree";
import Registry from "../core/Registry";
import { PolygonRegionModel, HtxPolygon } from "./PolygonRegion";

const Model = types
  .model({
    type: "lineregion",
    minNumPoints: types.optional(types.integer, 2),
    maxNumPoints: types.optional(types.integer, 2),
    canAddPointsAfterClosure: types.optional(types.boolean, false),
  })
  .views((self) => ({
    get maxPointsReached() {
      return self.maxNumPoints && self.points.length >= self.maxNumPoints;
    },
    get showArrow() {
      return self.control.arrow == true;
    },
  }))
  .actions(self => {
    const Super = {
      afterCreate: self.afterCreate
    }

    return {
      afterCreate() {
        Super.afterCreate()

        // If you select a Label and then deselect it the Line tool is still active
        // When you click the mouse an empty region (without labelName) will be created
        // I don't know how to disable this behavior so I will remove the region if
        // it does not have a labelName, but only when using linelabels
        // A <Line> tag does not have a labelName (why?) so we won't delete those
        if(!self.labelName && self.results.length && self.results[0].type == "linelabels") {
          console.log(self.results[0].type)
          self.closePoly()
          self.destroyRegion()
          // Delete the region on the next tick, otherwise an error is thrown
          // Note that we receive a warning from MST that changes have been made to the
          // region after it is removed. Not sure how to prevent this. It works though.
          setTimeout(() => self.deleteRegion())
        }
      }
    }
  })

const LineRegionModel = types.compose(
  "LineRegionModel",
  PolygonRegionModel,
  Model,
);

const HtxLine = HtxPolygon;

Registry.addTag("lineregion", LineRegionModel, HtxLine);
Registry.addRegionType(
  LineRegionModel,
  "image",
  (value) => {
    return ["line", "linelabels"].includes(value.results?.length && value.results[0].type)
  },
);

export { LineRegionModel, HtxLine };
