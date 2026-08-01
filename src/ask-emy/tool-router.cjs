'use strict';

const { planAskEmyMessage } = require('./brain-planner.cjs');
const { routeAskEmyTool } = require('./tool-registry.cjs');

function routeAskEmyMessage(query, context = {}) {
  const plan = planAskEmyMessage(query, context);
  const toolRoute = routeAskEmyTool(plan);

  return {
    ...plan,
    tool: {
      name: toolRoute.toolName,
      permission: toolRoute.permission,
      dataSource: toolRoute.dataSource,
      responseType: toolRoute.responseType,
      cardsAllowed: toolRoute.recordCardsAllowed,
      locationSearchAllowed: toolRoute.locationSearchAllowed,
      requiresConfirmation: toolRoute.requiresConfirmation,
      usesExistingView: toolRoute.usesExistingView,
    },
    responseType: toolRoute.responseType,
    recordCardsAllowed: toolRoute.recordCardsAllowed,
    locationSearchAllowed: toolRoute.locationSearchAllowed,
    requiresConfirmation: toolRoute.requiresConfirmation,
  };
}

module.exports = {
  routeAskEmyMessage,
};
