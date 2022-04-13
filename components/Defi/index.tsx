import { useStore } from "effector-react";
import { $doc } from "../../src/store/did-doc";
import { $user } from "../../src/store/user";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";
import { $contract } from "../../src/store/contract";
import { $zil_address } from "../../src/store/zil_address";

function Component() {
  const Router = useRouter();

  const username = useStore($user)?.name as string;
  const doc = useStore($doc);
  const contract = useStore($contract);
  const controller = contract?.controller;
  const zil_address = useStore($zil_address);
  const address = zil_address?.base16.toLowerCase();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 style={{ marginBottom: "10%" }}>
        <p className={styles.username}>{username}.defi</p>
        <p>DID Domain</p>
      </h1>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      ></div>
      <div
        style={{
          marginTop: "7%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>
            <div
              className={styles.card1}
              onClick={() => {
                Router.push(`/${username}/did`);
              }}
            >
              <p className={styles.cardTitle3}>DeFi</p>
              <p className={styles.cardTitle2}>
                Decentralized Identifier document
              </p>
            </div>
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>
            <div
              className={styles.card}
              onClick={() => {
                Router.push(`/${username}.defi/p2p`);
                // if (controller === address) {
                //   updateIsController(true);
                //   Router.push(`/${username}/xwallet`);
                // } else {
                //   toast.error(
                //     `Only ${username}'s DID Controller can access this wallet.`,
                //     {
                //       position: "top-right",
                //       autoClose: 3000,
                //       hideProgressBar: false,
                //       closeOnClick: true,
                //       pauseOnHover: true,
                //       draggable: true,
                //       progress: undefined,
                //       theme: "dark",
                //     }
                //   );
                // }
              }}
            >
              <p className={styles.cardTitle3}>Peer to Peer</p>
              <p className={styles.cardTitle2}>desc</p>
            </div>
          </h2>
          <h2>
            <div
              className={styles.card}
              onClick={() => {
                Router.push(`/${username}.defi/funds`);
              }}
            >
              <p className={styles.cardTitle3}>add funds</p>
              <p className={styles.cardTitle2}>top up wallet</p>
            </div>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Component;
