import { useEffect, useState } from 'react'
import { useClient } from 'sanity'

const UNREAD_COUNT_QUERY = 'count(*[_type == "message" && isRead != true])'

export function MessagesIcon() {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    let mounted = true
    const fetchCount = () => {
      client.fetch<number>(UNREAD_COUNT_QUERY).then(n => {
        if (mounted) setCount(n)
      })
    }
    fetchCount()
    const subscription = client.listen(UNREAD_COUNT_QUERY).subscribe(fetchCount)
    return () => {
      mounted = false
      subscription.unsubscribe()
    }
    // useClient() returns a new client reference on every render, so this
    // intentionally runs once on mount rather than re-subscribing forever.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <span style={{ position: 'relative', display: 'inline-flex' }}>
      💬
      {count > 0 && (
        <span
          style={{
            position: 'absolute',
            top: -6,
            right: -8,
            background: '#e11d48',
            color: 'white',
            borderRadius: 999,
            fontSize: 10,
            fontWeight: 700,
            minWidth: 14,
            height: 14,
            lineHeight: '14px',
            textAlign: 'center',
            padding: '0 3px',
          }}
        >
          {count}
        </span>
      )}
    </span>
  )
}
