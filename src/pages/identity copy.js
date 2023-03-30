import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Emoji } from "emoji-picker-react";

import { Flex, Button, Heading, Text } from "@chakra-ui/react";

import {
  useNostrEvents,
  normalizeURL,
  eventAddress,
  findTag,
  getZapAmount,
} from "../nostr";
import Authors from "../lib/Authors";
import Tags from "../lib/Tags";
import Layout from "../lib/Layout";
import Feed from "../lib/Feed";
import Relays from "../lib/Relays";
import IdentityTree from "../lib/IdentityTree";
const RECENT = "recent";
const HOT = "hot";
const TOP = "top";

export default function IdentityTreePage() {
  // const [followsOnly, setFollowsOnly] = useState(false);
  // const [sortBy, setSortBy] = useState(RECENT);
  const { user, relays, follows, selectedRelay } = useSelector((s) => s.relay);
  // const selectedRelay = "wss://nostr.688.org"
  const relayUrls = relays.map((r) => r.url);
  console.log(selectedRelay,relays)
  const Kind10310Feed = useNostrEvents({
    filter: {
      kinds: [10310],
      limit: 1
    }
  });
  const { events, seen, seenByRelay } = Kind10310Feed;
  // console.log(followsFeed)

  // const { events, seen, seenByRelay } = followsOnly ? followsFeed : allFeed;
  console.log(events)
  const filteredEvents = useMemo(() => {
    if (!selectedRelay) {
      return events;
    }

    let ids = new Set([]);
    const normalized = normalizeURL(selectedRelay);
    const seenInRelay = seen[normalized];
    if (seenInRelay) {
      Array.from(seenInRelay).forEach((i) => {
        ids.add(i);
      });
    }

    return events
      .filter((ev) => ids.has(ev.id));
  }, [events, seen, selectedRelay]);

  const addresses = filteredEvents.map(eventAddress);
  const reactions = useNostrEvents({
    filter: {
      "#a": addresses,
      kinds: [7, 9735, 30023],
    },
  });

  function reactionCount(ev) {
    const addr = eventAddress(ev);
    return reactions.events.filter((ev) => findTag(ev.tags, "a") === addr)
      .length;
  }

  function zapCount(ev) {
    const addr = eventAddress(ev);
    return reactions.events
      .filter((ev) => ev.kind === 9735 && findTag(ev.tags, "a") === addr)
      .map(getZapAmount)
      .reduce((acc, a) => acc + a, 0);
  }



  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Habla</title>
      </Helmet>
      <Layout
        aside={
          <Flex flexDirection="column" as="aside" width={320} p={4} pr={4}>
            <Authors events={filteredEvents} relays={relayUrls} />
            <Tags events={filteredEvents} />
            <Relays />
          </Flex>
        }
      >
        <Flex alignItems="center" justifyContent="space-between">
          <Heading
            fontSize="18px"
            fontFamily="var(--font-mono)"
            fontWeight={500}
          >
            Notes on{" "}
            <Text as="span" color="purple.500">
              {selectedRelay}
            </Text>
          </Heading>
        </Flex>
        <Flex justifyContent="space-between" width="100%">
          <Flex alignItems="center">



          </Flex>
          
        </Flex>
        <IdentityTree
          reactions={reactions.events}
          events={events}
          seenByRelay={seenByRelay}
        />
      </Layout>
    </>
  );
}
