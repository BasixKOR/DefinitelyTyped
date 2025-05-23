import ReactReconciler = require("react-reconciler");
import ReactReconcilerConstants = require("react-reconciler/constants");
import * as Constants from "./ReactReconcilerPriorityConstant";
import * as ReactTestHostConfig from "./ReactTestHostConfig";

// $ExpectType Reconciler<Container, Instance, TextInstance, any, Instance, PublicInstance>
ReactReconciler<
    ReactTestHostConfig.Type,
    ReactTestHostConfig.Props,
    ReactTestHostConfig.Container,
    ReactTestHostConfig.Instance,
    ReactTestHostConfig.TextInstance,
    ReactTestHostConfig.SuspenseInstance,
    ReactTestHostConfig.HydratableInstance,
    ReactTestHostConfig.FormInstance,
    ReactTestHostConfig.PublicInstance,
    ReactTestHostConfig.HostContext,
    ReactTestHostConfig.ChildSet,
    ReactTestHostConfig.TimeoutHandle,
    ReactTestHostConfig.NoTimeout,
    ReactTestHostConfig.TransitionStatus
>(ReactTestHostConfig);

function isEqual(target: number, value: number): boolean {
    return target === value;
}

// $ExpectType boolean
isEqual(Constants.CONTINUOUS_EVENT_PRIORITY, ReactReconcilerConstants.ContinuousEventPriority);

// $ExpectType boolean
isEqual(Constants.DISCRETE_EVENT_PRIORITY, ReactReconcilerConstants.DiscreteEventPriority);

// $ExpectType boolean
isEqual(Constants.DEFAULT_EVENT_PRIORITY, ReactReconcilerConstants.DefaultEventPriority);

// $ExpectType boolean
isEqual(Constants.IDLE_EVENT_PRIORITY, ReactReconcilerConstants.IdleEventPriority);

// $ExpectType boolean
isEqual(Constants.LEGACY_ROOT, ReactReconcilerConstants.LegacyRoot);

// $ExpectType boolean
isEqual(Constants.CONCURRENT_ROOT, ReactReconcilerConstants.ConcurrentRoot);

// $ExpectType boolean
isEqual(Constants.NO_EVENT_PRIORITY, ReactReconcilerConstants.NoEventPriority);
