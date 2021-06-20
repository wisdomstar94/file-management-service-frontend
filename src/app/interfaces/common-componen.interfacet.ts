import { AlertComponent } from "../components/alert/alert.component";
import { CommonContentComponent } from "../components/common-content/common-content.component";
import { CommonNavComponent } from "../components/common-nav/common-nav.component";
import { CommonTopHeaderComponent } from "../components/common-top-header/common-top-header.component";

export interface CommonComponent {
  alert: AlertComponent | null;

  commonNav: CommonNavComponent | null;
  commonTopHeader: CommonTopHeaderComponent | null;
  commonContent: CommonContentComponent | null;
}
