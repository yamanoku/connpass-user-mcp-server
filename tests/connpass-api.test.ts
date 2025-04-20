import { assertEquals, assertExists } from "jsr:@std/assert";
import {
  buildUserEndpoint,
  buildUserListEndpoint,
  fetchConnpassAPI,
} from "../tools/helpers/index.ts";
import type {
  ConnpassAttendedEventsResponse,
  ConnpassPresenterEventsResponse,
  ConnpassUserGroupListResponse,
  ConnpassUserListResponse,
} from "../types.ts";
import { USERSAPI } from "../constants.ts";

// Basic API structure validation
Deno.test("Connpass API endpoint structure validation", () => {
  // Test user endpoint building
  const userEndpoint = buildUserEndpoint("", "testuser");
  assertEquals(userEndpoint, `${USERSAPI}/testuser/`);

  // Test attended events endpoint building
  const attendedEventsEndpoint = buildUserEndpoint(
    "attended_events",
    "testuser",
  );
  assertEquals(attendedEventsEndpoint, `${USERSAPI}/testuser/attended_events/`);

  // Test presenter events endpoint building
  const presenterEventsEndpoint = buildUserEndpoint(
    "presenter_events",
    "testuser",
  );
  assertEquals(
    presenterEventsEndpoint,
    `${USERSAPI}/testuser/presenter_events/`,
  );

  // Test user list endpoint building
  const userListEndpoint = buildUserListEndpoint(["user1", "user2"]);
  assertEquals(userListEndpoint, `${USERSAPI}/?nickname=user1,user2`);
});

// API response structure validation
Deno.test({
  name: "Connpass API response structure validation",
  fn: async () => {
    try {
      // Using a known public user for testing
      const testNickname = "yamanoku"; // Sample user from the types.ts example

      try {
        // User list endpoint test
        const userListEndpoint = buildUserListEndpoint([testNickname]);
        const userListResponse = await fetchConnpassAPI<
          ConnpassUserListResponse
        >(userListEndpoint);

        // Verify response structure
        assertExists(userListResponse.results_returned);
        assertExists(userListResponse.results_available);
        assertExists(userListResponse.results_start);
        assertExists(userListResponse.users);

        if (userListResponse.users.length > 0) {
          const user = userListResponse.users[0];
          assertExists(user.id);
          assertExists(user.nickname);
          assertExists(user.display_name);
          assertExists(user.url);
          assertExists(user.created_at);
          assertExists(user.attended_event_count);
          assertExists(user.organize_event_count);
          assertExists(user.presenter_event_count);
          assertExists(user.bookmark_event_count);
        }
      } catch (error) {
        if (error instanceof Error && error.message.includes("429")) {
          console.warn(
            "Rate limited on user list endpoint, skipping this test",
          );
        } else {
          throw error;
        }
      }

      // Add delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        // User group list endpoint test
        const groupsEndpoint = buildUserEndpoint("groups", testNickname);
        const groupsResponse = await fetchConnpassAPI<
          ConnpassUserGroupListResponse
        >(groupsEndpoint);

        // Verify response structure
        assertExists(groupsResponse.results_returned);
        assertExists(groupsResponse.results_available);
        assertExists(groupsResponse.results_start);
        assertExists(groupsResponse.groups);

        if (groupsResponse.groups.length > 0) {
          const group = groupsResponse.groups[0];
          assertExists(group.id);
          assertExists(group.title);
          assertExists(group.url);
          assertExists(group.member_users_count);
        }
      } catch (error) {
        if (error instanceof Error && error.message.includes("429")) {
          console.warn("Rate limited on groups endpoint, skipping this test");
        } else {
          throw error;
        }
      }

      // Add delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        // User attended events endpoint test
        const attendedEventsEndpoint = buildUserEndpoint(
          "attended_events",
          testNickname,
        );
        const attendedEventsResponse = await fetchConnpassAPI<
          ConnpassAttendedEventsResponse
        >(attendedEventsEndpoint);

        // Verify response structure
        assertExists(attendedEventsResponse.results_returned);
        assertExists(attendedEventsResponse.results_available);
        assertExists(attendedEventsResponse.results_start);
        assertExists(attendedEventsResponse.events);

        if (attendedEventsResponse.events.length > 0) {
          const event = attendedEventsResponse.events[0];
          assertExists(event.id);
          assertExists(event.title);
          assertExists(event.url);
          assertExists(event.event_type);
          assertExists(event.open_status);
          assertExists(event.owner_nickname);
          assertExists(event.owner_display_name);
          assertExists(event.updated_at);
        }
      } catch (error) {
        if (error instanceof Error && error.message.includes("429")) {
          console.warn(
            "Rate limited on attended events endpoint, skipping this test",
          );
        } else {
          throw error;
        }
      }

      // Add delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        // User presenter events endpoint test
        const presenterEventsEndpoint = buildUserEndpoint(
          "presenter_events",
          testNickname,
        );
        const presenterEventsResponse = await fetchConnpassAPI<
          ConnpassPresenterEventsResponse
        >(presenterEventsEndpoint);

        // Verify response structure
        assertExists(presenterEventsResponse.results_returned);
        assertExists(presenterEventsResponse.results_available);
        assertExists(presenterEventsResponse.results_start);
        assertExists(presenterEventsResponse.events);
      } catch (error) {
        if (error instanceof Error && error.message.includes("429")) {
          console.warn(
            "Rate limited on presenter events endpoint, skipping this test",
          );
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error("API validation test failed:", error);
      throw error;
    }
  },
});
