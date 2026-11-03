'use client'
import { deleteBlog } from "@/actions/blog";
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

type Props = {
    id: number;
}

export default function DeleteBlog({ id }: Props) {
    const [isPending, startTransition] = useTransition()
    const [isOpen, setIsOpen] = useState(false)
    const [error, setError] = useState('')

    const router = useRouter()

    const handleDelete = () => {
        startTransition(async () => {
            try {
                const result = await deleteBlog(id)

                if (!result.success) {
                    setError(result.message)
                } else {
                    setIsOpen(false)
                    router.refresh()
                }
            } catch (err) {
                setError("Something went wrong. Please try again.")
            }
        })
    }

    return (
        <div>
            <button
                type="button"
                className="bg-red-400 p-1 hover:bg-red-400/75 rounded-lg text-white m-2 w-1/1"
                onClick={() => setIsOpen(true)}
            >
                Delete
            </button>

            {/* Confirmation Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

                    <div className="bg-white w-full max-w-md mx-4 rounded-xl shadow-lg p-6">

                        <h2 className="text-xl font-semibold text-gray-800">
                            Delete Blog
                        </h2>

                        <p className="text-gray-600 mt-3">
                            Are you sure you want to delete this blog?
                            This action cannot be undone.
                        </p>

                        {/* Error Message */}
                        {error && (
                            <p className="text-red-500 text-sm mt-3">
                                {error}
                            </p>
                        )}

                        {/* Modal Buttons */}
                        <div className="flex justify-end gap-3 mt-6">

                            <button
                                type="button"
                                onClick={() => {
                                    setIsOpen(false)
                                    setError('')
                                }}
                                disabled={isPending}
                                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={isPending}
                                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
                            >
                                {isPending ? 'Deleting...' : 'Confirm Delete'}
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}