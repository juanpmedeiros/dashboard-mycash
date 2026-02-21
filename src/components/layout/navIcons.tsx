import {
  MdOutlineHome,
  MdOutlineFlag,
  MdOutlineCreditCard,
  MdOutlineReceiptLong,
  MdOutlinePerson,
} from 'react-icons/md'

export const navIcons: Record<string, React.ReactNode> = {
  Home: <MdOutlineHome className="size-6 shrink-0" aria-hidden />,
  Objetivos: <MdOutlineFlag className="size-6 shrink-0" aria-hidden />,
  Cartões: <MdOutlineCreditCard className="size-6 shrink-0" aria-hidden />,
  Transações: <MdOutlineReceiptLong className="size-6 shrink-0" aria-hidden />,
  Perfil: <MdOutlinePerson className="size-6 shrink-0" aria-hidden />,
}
