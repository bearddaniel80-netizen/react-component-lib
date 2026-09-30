/*
 CREATING HANDLER:
 
  function escapeNavigation(context) {
    if (context.event.key !== "Escape") {
      return context;
    }

    return {
      ...context,
      handled: true,
      action: "escape",
    };
  }

  ADDING HANDLERS:

  navigationPipeline.register(
    escapeNavigation,
    100
  );
*/

import { horizontalNavigation } from "./useHorizontal";
import { verticalNavigation } from "./useVertical";
import { homeEndNavigation } from "./useHomeEnd";
import { pageNavigation } from "./usePage";
import { tabNavigation } from "./useTab";

class NavigationPipeline {
  constructor() {
    this.handlers = [];
  }

  register(handler, priority = 100, callback = null) {
    const entry = {
      handler,
      priority,
      callback,
    };

    this.handlers.push(entry);

    // Highest priority runs first
    this.handlers.sort(
      (a, b) => b.priority - a.priority
    );

    // Return an unregister function
    return () => {
      this.unregister(handler);
    };
  }

  unregister(handler) {
    this.handlers = this.handlers.filter(
      (entry) => entry.handler !== handler
    );
  }

  navigate(context) {
    let result = context;

    for (const { handler, callback } of this.handlers) {
      result = handler(result);

      if (result?.handled) {
        callback?.(result);
        break;
      }
    }

    return result;
  }
}

export const navigationPipeline =
  new NavigationPipeline();

/*
 * Default handlers
 */
navigationPipeline.register(verticalNavigation, 5);
navigationPipeline.register(horizontalNavigation, 10);
navigationPipeline.register(tabNavigation, 15);
navigationPipeline.register(pageNavigation, 20);
navigationPipeline.register(homeEndNavigation, 25);
