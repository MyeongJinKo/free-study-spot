import Link from "next/link"

export default function Footer() {
  return (
    <footer className="mt-auto border-t py-6">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
        <p>© 2026 무료 공부 장소. 누구나 자유롭게 이용하세요.</p>
        <div className="flex items-center gap-4">
          <Link href="/submit" className="hover:text-foreground transition-colors">
            장소 제보
          </Link>
          <a
            href="https://github.com/MyeongJinKo/free-study-spot"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
