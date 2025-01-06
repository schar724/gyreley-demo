import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/help_/quickstart')({
  component: () => <div>Hello /help/quickstart!</div>,
})
