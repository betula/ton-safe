import { provide } from "provi/client";
import { val, wrap } from "remini";
import { Home } from "../pages/Home/Home";
import { HomeLogic } from "../pages/Home/HomeLogic.service";
import { HomeRoute } from "../pages/Home/HomeRoute.service";
import { PrivacyPolicy } from "../pages/PrivacyPolicy/PrivacyPolicy";
import { PrivacyPolicyLogic } from "../pages/PrivacyPolicy/PrivacyPolicyLogic.service";
import { PrivacyPolicyRoute } from "../pages/PrivacyPolicy/PrivacyPolicyRoute.service";
import { Support } from "../pages/Support/Support";
import { SupportLogic } from "../pages/Support/SupportLogic.service";
import { SupportRoute } from "../pages/Support/SupportRoute.service";
import { TermsOfUse } from "../pages/TermsOfUse/TermsOfUse";
import { TermsOfUseLogic } from "../pages/TermsOfUse/TermsOfUseLogic.service";
import { TermsOfUseRoute } from "../pages/TermsOfUse/TermsOfUseRoute.service";

export const ActivePage = () => {

  const page = <A,T>(Component: A, Logic: () => T): { Component: A; readonly logic: T; } => ({
    Component,
    get logic() {
      return provide(Logic);
    }
  });

  const $page = wrap(() => {
    if (provide(HomeRoute).active) {
      return page(Home, HomeLogic);
    }
    else if (provide(PrivacyPolicyRoute).active) {
      return page(PrivacyPolicy, PrivacyPolicyLogic);
    }
    else if (provide(SupportRoute).active) {
      return page(Support, SupportLogic);
    }
    else if (provide(TermsOfUseRoute).active) {
      return page(TermsOfUse, TermsOfUseLogic);
    }
  });

  return {
    get page() {
      return val($page)
    }
  }
};
