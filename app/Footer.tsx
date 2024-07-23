import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { SiLinkedin } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-muted py-6 w-screen">
      <div className="container max-w-7xl flex justify-center items-center gap-10">
        <p className="text-xs text-muted-foreground">&copy; Made by Sumona</p>
        <div className="flex items-center gap-2 text-muted-foreground">
            <Link href='https://github.com/7sumona02?tab=repositories'><FaGithub /></Link>
            <Link href='https://www.linkedin.com/in/sumona-biswas-6442a5214?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'><SiLinkedin /></Link>
        </div>
      </div>
    </footer>
  )
}
