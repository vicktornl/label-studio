import { types } from "mobx-state-tree";
import { Polygon } from "./Polygon";
import { NodeViews } from "../components/Node/Node";

const LineTool = types
  .model("LineTool", {
    group: "segmentation",
    shortcut: "L",
  })
  .views((self) => ({
    get tagTypes() {
      return {
        controlTagTypes: ["line"],
      };
    },
    get viewTooltip() {
      return "Line region";
    },
    get iconComponent() {
      return NodeViews.LineRegionModel.icon;
    },
    current() {
      return self.currentArea;
    },
  }));

const Line = types.compose(LineTool.name, Polygon, LineTool);

export { Line };
