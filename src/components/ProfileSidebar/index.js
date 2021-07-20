import Box from "../Box";
import { AlurakutProfileSidebarMenuDefault } from "../../lib/AlurakutCommons";

const ProfileSidebar = (props) => (
  <Box as="aside">
    <img
      src={`https://github.com/${props.githubUser}.png`}
      style={{ borderRadius: "8px" }}
    />
    <hr />
    <a
      style={{ color: "#388bb0", fontWeight: "bold", textDecoration: "none" }}
      href={`https://github.com/${props.githubUser}`}
    >
      @{props.githubUser}
    </a>
    <hr />
    <AlurakutProfileSidebarMenuDefault />
  </Box>
);

export default ProfileSidebar;
