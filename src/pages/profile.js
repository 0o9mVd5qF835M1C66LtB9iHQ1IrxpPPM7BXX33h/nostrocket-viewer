import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import { useProfile } from "../nostr";
import Layout from "../lib/Layout";
import UserProfile from "../lib/Profile";
import useNip05 from "../lib/useNip05";

export default function Profile() {
  const { p } = useParams();
  const pubkey = useNip05(p);
  const { data } = useProfile({ pubkey });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Habla - {data?.display_name && `- ${data.display_name}`} </title>
      </Helmet>
      <Layout>
        <UserProfile pubkey={pubkey} />
      </Layout>
    </>
  );
}
