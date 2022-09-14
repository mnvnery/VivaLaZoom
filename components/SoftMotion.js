import { motion } from 'framer-motion'

const SoftMotion = ({ children }) => (
  <motion.div
    initial={{ y: 100, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ stiffness: 50, duration: 0.7 }}
  >
    {children}
  </motion.div>
)

export default SoftMotion
