import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { ConferenceApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';
import { SpeakerDetailPage } from '../pages/speaker-detail/speaker-detail';
import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';
import { UsersPage } from '../pages/users/users';
import { PhonePage } from '../pages/phone/phone'
import { PasswordPage } from '../pages/password/password';
import { UpdatePage } from "../pages/update/update";
import { LoginsPage } from  '../pages/logins/logins'
import { SigninPage } from '../pages/signin/signin'
import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import {HttpClientModule} from "@angular/common/http";
import {ProxyHttpService} from "../providers/proxy.http.service";

import {Camera} from "@ionic-native/camera";
import {ImagePicker} from "@ionic-native/image-picker";
import {IndexPage} from "../pages/index/index";
import {ClassroomPage} from "../pages/classroom/classroom";
import {GroupingPage} from "../pages/grouping/grouping";
import {DecisionPage} from "../pages/decision/decision";
import {Base64} from "@ionic-native/base64";
import {RecordsPage} from "../pages/records/records";
import {SimulationPage} from "../pages/simulation/simulation";

import {BaidutbPage} from "../pages/baidutb/baidutb";
import {FindPasswordPage} from "../pages/find-password/find-password";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {SimulationListPage} from "../pages/simulation-list/simulation-list";
import {RecordsListPage} from "../pages/records-list/records-list";
import {GradePage} from "../pages/grade/grade";
import {RsidebarPage} from "../pages/rsidebar/rsidebar";
import {PadGroupPage} from "../pages/pad-group/pad-group";
import {OperationPage} from "../pages/operation/operation";
import {PadGroupListPage} from "../pages/pad-group-list/pad-group-list";
import {ServerSocket} from "../providers/ws.service";
import {ProcessJSONUtil} from "../providers/ProcessJSONUtil";
import {WaitPage} from "../pages/waitingStudentTakein/wait";
import {CallNamePage} from "../pages/call-name/call-name";
import {CurrentGroupPage} from "../pages/current-group/current-group";
import {CommentPage} from "../pages/comment/comment";
import {PadBdtbPage} from "../pages/pad-bdtb/pad-bdtb";
import {PadQQPage} from "../pages/pad-qq/pad-qq";
import {PadTnfbPage} from "../pages/pad-tnfb/pad-tnfb";
import {PadWeiboPage} from "../pages/pad-weibo/pad-weibo";

@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    UsersPage,
    PasswordPage,
    UpdatePage,
    LoginsPage,
    SigninPage,
    PhonePage,
    WaitPage,
    ClassroomPage,
    DecisionPage,
    GroupingPage,
    SimulationPage,
    SimulationListPage,
    RecordsPage,
    RecordsListPage,
    IndexPage,
    BaidutbPage,
    FindPasswordPage,
    GradePage,
    RsidebarPage,
    OperationPage,
    PadGroupListPage,
    CurrentGroupPage,
    CallNamePage,
    PadGroupPage,
    CommentPage,
    PadBdtbPage,
    PadQQPage,
    PadTnfbPage,
    PadWeiboPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
        { component: SchedulePage, name: 'Schedule', segment: 'schedule' },
        { component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail/:sessionId' },
        { component: ScheduleFilterPage, name: 'ScheduleFilter', segment: 'scheduleFilter' },
        { component: SpeakerListPage, name: 'SpeakerList', segment: 'speakerList' },
        { component: SpeakerDetailPage, name: 'SpeakerDetail', segment: 'speakerDetail/:speakerId' },
        { component: MapPage, name: 'Map', segment: 'map' },
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        { component: SupportPage, name: 'SupportPage', segment: 'support' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
        { component: UsersPage, name: 'UsersPage', segment: 'user' },
        { component: PasswordPage, name: 'PasswordPage', segment: 'password' },
        { component: UpdatePage, name: 'UpdatePage', segment: 'update' },
        { component: LoginsPage, name: 'LoginsPage', segment: 'logins' },
        { component: PhonePage, name: 'PhonePage', segment: 'phone' },
        { component: SigninPage, name: 'SigninPage', segment: 'signin' },
        // { component: IndexPage, name: 'IndexPage', segment: 'index' },
        { component: ClassroomPage, name: 'ClassroomPage', segment: 'classroom' },
        { component: DecisionPage, name: 'DecisionPage', segment: 'decision' },
        { component: GroupingPage, name: 'GroupingPage', segment: 'grouping' },
        { component: RecordsPage, name: 'RecordsPage', segment: 'records' },
        { component: RecordsListPage, name: 'RecordsListPage', segment: 'recordsList' },
        { component: FindPasswordPage, name: 'FindPasswordPage', segment: 'findPassword' },
        { component: BaidutbPage, name: 'BaidutbPage', segment: 'baidutb' },
        { component: SimulationPage, name: 'SimulationPage', segment: 'simulation' },
        { component: SimulationListPage, name: 'SimulationListPage', segment: 'simulationList' },
        { component: GradePage, name: 'GradePage', segment: 'grade' },
        { component: RsidebarPage, name: 'RsidebarPage', segment: 'rsidebar' },
        { component: OperationPage, name: 'OperationPage', segment: 'operation' },
        { component: PadGroupListPage, name: 'PadGroupListPage', segment: 'padGroupList' },
        { component: CallNamePage, name: 'CallNamePage', segment: 'callName' },
        { component: CurrentGroupPage, name: 'CurrentGroupPage', segment: 'currentGroup' },
        { component: CommentPage, name: 'CommentPage', segment: 'comment' },
        { component: PadGroupPage, name: 'PadGroupPage', segment: 'padGroup' },
        { component: WaitPage, name: 'WaitPage', segment: 'wait' },
        { component: PadBdtbPage, name: 'PadBdtbPage', segment: 'pad-bdtb' },
        { component: PadQQPage, name: 'PadQQPage', segment: 'pad-qq' },
        { component: PadTnfbPage, name: 'PadTnfbPage', segment: 'pad-tnfb' },
        { component: PadWeiboPage, name: 'PadWeiboPage', segment: 'pad-weibo' }
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    UsersPage,
    PasswordPage,
    UpdatePage,
    LoginsPage,
    SigninPage,
    PhonePage,
    IndexPage,
    ClassroomPage,
    DecisionPage,
    GroupingPage,
    RecordsPage,
    RecordsListPage,
    BaidutbPage,
    SimulationPage,
    SimulationListPage,
    FindPasswordPage,
    GradePage,
    RsidebarPage,
    PadGroupPage,
    WaitPage,
    OperationPage,
    PadGroupListPage,
    CallNamePage,
    CurrentGroupPage,
    CommentPage,
    PadBdtbPage,
    PadQQPage,
    PadTnfbPage,
    PadWeiboPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    ProxyHttpService,
    UserData,
    InAppBrowser,
    Camera,
    Base64,
    BarcodeScanner,
    ImagePicker,
    ServerSocket,
    ProcessJSONUtil,
    SplashScreen
  ]
})
export class AppModule { }
