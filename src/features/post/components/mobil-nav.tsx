import { useRouter } from 'next/router'
import { ClipboardListIcon } from '@heroicons/react/outline'
import { useIsFetching } from 'react-query'
import { motion, AnimatePresence } from 'framer-motion'

import PostComment from './front-matter/post-comment'
import PostLikes from './front-matter/post-likes'
import PostViews from './front-matter/post-views'

type MobileNavProps = {
  setOpenDrawer: (openDrawer: boolean) => void
  hasToc: boolean
  handleScrollToComments: () => void
}

const MobileNav = ({
  setOpenDrawer,
  hasToc = false,
  handleScrollToComments,
}: MobileNavProps) => {
  const { query } = useRouter()
  const isFetching = useIsFetching()
  return (
    <AnimatePresence>
      {!isFetching && (
        <motion.nav className="flex fixed bottom-0 z-75 items-center -mx-6 w-full h-12 bg-powder dark:bg-slate rounded-t border-t border-gray-300 dark:border-none shadow-lg md:-mx-12 md:h-16 lg:hidden">
          <ul className="flex justify-around items-center w-full">
            {hasToc && (
              <li>
                <button
                  type="button"
                  aria-label="table-of-content"
                  className="group inline-flex p-1 bg-black/5 dark:bg-white/10 rounded-md transition-colors ease-linear lg:p-1.5"
                >
                  <ClipboardListIcon
                    className="w-6 h-6 text-plum dark:text-grape"
                    onClick={() => setOpenDrawer(true)}
                  />
                </button>
              </li>
            )}
            <li>
              <PostViews postSlug={query.slug as string} />
            </li>
            <li>
              <PostComment
                handleScrollToComments={handleScrollToComments}
                postSlug={query.slug as string}
              />
            </li>
            <li>
              <PostLikes postSlug={query.slug as string} />
            </li>
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

export default MobileNav
