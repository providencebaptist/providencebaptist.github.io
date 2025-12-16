/* eslint-disable react-refresh/only-export-components */
import React, { ReactElement } from 'react'
import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import * as HelmetAsync from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from '@/components/ui/tooltip'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { HelmetProvider } = (HelmetAsync as any).default || HelmetAsync;

const createQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
})

export const renderWithProviders = (
    ui: ReactElement,
    {
        route = '/',
        queryClient = createQueryClient(),
        ...renderOptions
    }: { route?: string; queryClient?: QueryClient } & Omit<RenderOptions, 'wrapper'> = {},
) => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => {
        return (
            <QueryClientProvider client={queryClient}>
                <HelmetProvider>
                    <TooltipProvider>
                        <MemoryRouter initialEntries={[route]}>
                            {children}
                        </MemoryRouter>
                    </TooltipProvider>
                </HelmetProvider>
            </QueryClientProvider>
        )
    }

    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'
