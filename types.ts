// Define types based on the API response structure
export type ConnpassUser = {
  id: number;
  nickname: string;
  display_name: string;
  description: string;
  url: string;
  image_url: string | null;
  created_at: string;
  attended_event_count: number;
  organize_event_count: number;
  presenter_event_count: number;
  bookmark_event_count: number;
};

export type ConnpassGroup = {
  id: number;
  subdomain: string | null;
  title: string;
  sub_title: string | null;
  url: string;
  description: string | null;
  owner_text: string | null;
  image_url: string | null;
  website_url: string | null;
  website_name: string | null;
  twitter_username: string | null;
  facebook_url: string | null;
  member_users_count: number;
};

export type ConnpassEvent = {
  id: number;
  title: string;
  catch: string | null;
  description: string | null;
  url: string;
  image_url: string | null;
  hash_tag: string | null;
  started_at: string | null;
  ended_at: string | null;
  limit: number | null;
  event_type: "participation" | "advertisement";
  open_status: "preopen" | "open" | "close" | "cancelled";
  group: {
    id: number;
    subdomain: string;
    title: string;
    url: string;
  } | null;
  address: string | null;
  place: string | null;
  lat: number | string | null;
  lon: number | string | null;
  owner_id: number | null;
  owner_nickname: string;
  owner_display_name: string;
  accepted: number;
  waiting: number;
  updated_at: string;
};

/* UserListのJSONレスポンス例
 {
  "results_returned": 1,
  "results_available": 91,
  "results_start": 1,
  "users": [
    {
      "id": 8,
      "nickname": "haru860",
      "display_name": "佐藤 治夫",
      "description": "株式会社ビープラウド代表取締役。connpass企画・開発・運営。\nhttp://twitter.com/haru860\nhttp://shacho.beproud.jp/",
      "url": "https://connpass.com/user/haru860/",
      "image_url": "string",
      "created_at": "2011-10-20T18:23:03+09:00",
      "attended_event_count": 261,
      "organize_event_count": 231,
      "presenter_event_count": 34,
      "bookmark_event_count": 57
    }
  ]
}
*/

export type ConnpassUserListResponse = {
  results_returned: number;
  results_available: number;
  results_start: number;
  users: ConnpassUser[];
};

/* GruupのJSONレスポンス例
  {
    "results_returned": 1,
    "results_available": 91,
    "results_start": 1,
    "groups": [
      {
        "id": 1,
        "subdomain": "bpstudy",
        "title": "BPStudy",
        "sub_title": "株式会社ビープラウドが主催するIT勉強会",
        "url": "https://bpstudy.connpass.com/",
        "description": "string",
        "owner_text": "株式会社ビープラウド",
        "image_url": "string",
        "website_url": "http://www.beproud.jp/",
        "website_name": "株式会社ビープラウド",
        "twitter_username": "bpstudy",
        "facebook_url": "https://www.facebook.com/beproud.inc",
        "member_users_count": "5743"
      }
    ]
  }
*/

export type ConnpassUserGroupListResponse = {
  results_returned: number;
  results_available: number;
  results_start: number;
  groups: ConnpassGroup[];
};

/* AttendedEventsのJSONレスポンス例
 {
   "results_returned": 1,
   "results_available": 91,
   "results_start": 1,
   "events": [
     {
       "id": 364,
       "title": "BPStudy#56",
       "catch": "株式会社ビープラウドが主催するWeb系技術討論の会",
       "description": "今回は「Python プロフェッショナル プログラミング」執筆プロジェクトの継続的ビルドについて、お話しして頂きます。",
       "url": "https://bpstudy.connpass.com/event/364/",
       "image_url": "string",
       "hash_tag": "bpstudy",
       "started_at": "2012-04-17T18:30:00+09:00",
       "ended_at": "2012-04-17T20:30:00+09:00",
       "limit": 80,
       "event_type": "participation",
       "open_status": "open",
       "group": {
         "id": 1,
         "subdomain": "bpstudy",
         "title": "BPStudy",
         "url": "https://bpstudy.connpass.com/"
       },
       "address": "東京都豊島区東池袋3-1-1",
       "place": "BPオフィス (サンシャイン60 45階)",
       "lat": "35.729402000000",
       "lon": "139.718209000000",
       "owner_id": 8,
       "owner_nickname": "haru860",
       "owner_display_name": "佐藤 治夫",
       "accepted": 80,
       "waiting": 15,
       "updated_at": "2012-03-20T12:07:32+09:00"
     }
   ]
 }
*/

export type ConnpassAttendedEventsResponse = {
  results_returned: number;
  results_available: number;
  results_start: number;
  events: ConnpassEvent[];
};

/* PresenterEventsのJSONレスポンス例
{
  "results_returned": 1,
  "results_available": 91,
  "results_start": 1,
  "events": [
    {
      "id": 364,
      "title": "BPStudy#56",
      "catch": "株式会社ビープラウドが主催するWeb系技術討論の会",
      "description": "今回は「Python プロフェッショナル プログラミング」執筆プロジェクトの継続的ビルドについて、お話しして頂きます。",
      "url": "https://bpstudy.connpass.com/event/364/",
      "image_url": "string",
      "hash_tag": "bpstudy",
      "started_at": "2012-04-17T18:30:00+09:00",
      "ended_at": "2012-04-17T20:30:00+09:00",
      "limit": 80,
      "event_type": "participation",
      "open_status": "open",
      "group": {
        "id": 1,
        "subdomain": "bpstudy",
        "title": "BPStudy",
        "url": "https://bpstudy.connpass.com/"
      },
      "address": "東京都豊島区東池袋3-1-1",
      "place": "BPオフィス (サンシャイン60 45階)",
      "lat": "35.729402000000",
      "lon": "139.718209000000",
      "owner_id": 8,
      "owner_nickname": "haru860",
      "owner_display_name": "佐藤 治夫",
      "accepted": 80,
      "waiting": 15,
      "updated_at": "2012-03-20T12:07:32+09:00"
    }
  ]
}
*/
export type ConnpassPresenterEventsResponse = {
  results_returned: number;
  results_available: number;
  results_start: number;
  events: ConnpassEvent[];
};

export type FormatEvents = {
  title: string;
  url: string;
  date: string | null;
  place: string | null;
  description: string | null;
};

export type FormatUsers = {
  nickname: string;
  attended_event_count: number;
  organize_event_count: number;
  presenter_event_count: number;
  bookmark_event_count: number;
};

export type FormatGroups = {
  title: string;
  url: string;
  description: string | null;
  owner: string | null;
  website_url: string | null;
  member_users_count: number;
};
