// cspell:disable-file
// Note: This is a generated file. DO NOT EDIT!

import type {
  EmptyObject,
  IdRequest,
  IdResponse,
  PageIconResponse,
} from "./common"

/**
 * Parameters for opening a session stream.
 */
export type UpdateSessionStreamParameters =
  | {
      message: string
      agent_id?: string | "notion_ai" | "33333333-3333-3333-3333-333333333333"
      session_id?: string
      attachments?: Array<{
        file_upload: {
          id: string
        }
        /**
         * Always `file_upload`
         */
        type?: "file_upload"
        name?: string
      }>
      metadata?: Record<string, string>
      prompt_context?: string
    }
  | {
      session_id: string
      actions: Array<{
        action_id: string
        /**
         * One of: `approve`, `reject`
         */
        option_id: "approve" | "reject"
      }>
      metadata?: Record<string, string>
    }
  | {
      session_id: string
      continue_from: string
    }

/**
 * An event emitted by a session stream.
 */
type SessionStreamEventBase = {
  /**
   * Always `session_event`
   */
  object: "session_event"
  id: string
  session_id: string
  sequence: number
  created_at: string
}

type SessionStreamTextContent = {
  /**
   * Always `text`
   */
  type: "text"
  text: string
}

type SessionStreamFileContent = {
  /**
   * Always `file`
   */
  type: "file"
  file_id: string
}

type SessionStreamContentBlock =
  | SessionStreamTextContent
  | SessionStreamFileContent

type SessionStreamRequiredAction = {
  action_id: string
  title: string
  options: Array<{
    /**
     * One of: `approve`, `reject`
     */
    id: "approve" | "reject"
    label: string
  }>
}

type SessionStreamError = {
  code: string
  message: string
  retryable: boolean
}

type SessionStreamUsage = {
  input_tokens?: number
  output_tokens?: number
  total_tokens: number
}

type SessionStreamArtifact =
  | {
      /**
       * Always `page`
       */
      type: "page"
      url: string
      title: string
    }
  | {
      /**
       * Always `html_artifact`
       */
      type: "html_artifact"
      url: string
      page_url: string
    }

type SessionStreamCommittedEvent =
  | (SessionStreamEventBase & {
      /**
       * Always `user.message`
       */
      type: "user.message"
      content: Array<SessionStreamContentBlock>
      metadata?: Record<string, string>
    })
  | (SessionStreamEventBase & {
      /**
       * Always `agent.message`
       */
      type: "agent.message"
      content: Array<SessionStreamTextContent>
    })
  | (SessionStreamEventBase & {
      /**
       * Always `agent.tool_use`
       */
      type: "agent.tool_use"
      tool_name: string
    })
  | (SessionStreamEventBase & {
      /**
       * Always `agent.tool_result`
       */
      type: "agent.tool_result"
      tool_use_id: string
      tool_name: string
      is_error: boolean
    })
  | (SessionStreamEventBase & {
      /**
       * Always `session.status`
       */
      type: "session.status"
      status:
        | "queued"
        | "in_progress"
        | "requires_action"
        | "completed"
        | "failed"
        | "canceled"
        | "terminated"
      required_actions?: Array<SessionStreamRequiredAction>
      error?: SessionStreamError
      usage?: SessionStreamUsage
      artifacts?: Array<SessionStreamArtifact>
    })

type SessionStreamProvisionalEvent =
  | {
      /**
       * Always `session_event`
       */
      object: "session_event"
      id: string
      session_id: string
      created_at: string
      /**
       * Always `agent.message`
       */
      type: "agent.message"
      content: Array<SessionStreamTextContent>
    }
  | {
      /**
       * Always `session_event`
       */
      object: "session_event"
      id: string
      session_id: string
      created_at: string
      /**
       * Always `agent.tool_use`
       */
      type: "agent.tool_use"
      tool_name: string
    }

export type UpdateSessionStreamResponse =
  | {
      /**
       * Always `session.snapshot`
       */
      type: "session.snapshot"
      session: {
        /**
         * Always `session`
         */
        object: "session"
        id: string
        agent_id: string
        title: string
        /**
         * One of: `queued`, `in_progress`, `requires_action`, `completed`, `failed`, `canceled`, `terminated`
         */
        status:
          | "queued"
          | "in_progress"
          | "requires_action"
          | "completed"
          | "failed"
          | "canceled"
          | "terminated"
        created_at: string
        updated_at: string
        required_actions?: Array<{
          action_id: string
          title: string
          options: Array<{
            /**
             * One of: `approve`, `reject`
             */
            id: "approve" | "reject"
            label: string
          }>
        }>
        error?: {
          code: string
          message: string
          retryable: boolean
        }
      }
    }
  | {
      /**
       * Always `event.provisional`
       */
      type: "event.provisional"
      event: SessionStreamProvisionalEvent
    }
  | {
      /**
       * Always `event.committed`
       */
      type: "event.committed"
      event: SessionStreamCommittedEvent
    }
  | {
      /**
       * Always `stream.timeout`
       */
      type: "stream.timeout"
      session_id: string
      message: string
    }
  | {
      /**
       * Always `stream.end`
       */
      type: "stream.end"
      session_id: string
      /**
       * One of: `requires_action`, `completed`, `failed`, `canceled`, `terminated`
       */
      status:
        | "requires_action"
        | "completed"
        | "failed"
        | "canceled"
        | "terminated"
    }
  | {
      /**
       * Always `stream.error`
       */
      type: "stream.error"
      error: {
        code: string
        message: string
        /**
         * One of: `true`, `false`
         */
        retryable: true | false
      }
      session_id?: string
    }

/**
 * Open a session stream.
 */
export const updateSessionStream = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: [
    "message",
    "agent_id",
    "session_id",
    "attachments",
    "metadata",
    "prompt_context",
    "actions",
    "continue_from",
  ],
  headers: { Accept: "text/event-stream" },
  path: (): string => `sessions`,
} as const

type AgentBatchBodyParameters = {
  // The operations to apply, at least one and at most 100. Operations are applied in the
  // order given, and the batch is not atomic: each operation succeeds or fails on its own,
  // and per-operation outcomes are reported in the async task's result.
  operations: Array<
    | {
        // Enable or disable one agent, equivalent to `PATCH /v1/agents/:agent_id/status`.
        action: "update_status"
        // The agent ID (a UUID), or `notion_ai` for the personal agent. Endpoint-specific
        // restrictions still apply.
        agent_id:
          | IdRequest
          | "notion_ai"
          | "33333333-3333-3333-3333-333333333333"
        // The status to apply to this agent.
        fields: {
          // "active" to re-enable an agent disabled through this API, or "disabled" to turn it
          // off.
          status: "active" | "disabled"
        }
      }
    | {
        // Set or clear one agent's credit limit, equivalent to `PATCH
        // /v1/agents/:agent_id/credit_limit`. Requires full access to the agent.
        action: "update_credit_limit"
        // The agent ID (a UUID), or `notion_ai` for the personal agent. Endpoint-specific
        // restrictions still apply.
        agent_id:
          | IdRequest
          | "notion_ai"
          | "33333333-3333-3333-3333-333333333333"
        // The credit limit to apply to this agent.
        fields: {
          // The per-agent credit limit as a non-negative integer, or null to clear the limit.
          credit_limit: number | null
        }
      }
    | {
        // Soft-delete one agent, equivalent to `DELETE /v1/agents/:agent_id`.
        action: "delete"
        // The agent ID (a UUID), or `notion_ai` for the personal agent. Endpoint-specific
        // restrictions still apply.
        agent_id:
          | IdRequest
          | "notion_ai"
          | "33333333-3333-3333-3333-333333333333"
      }
  >
}

export type AgentBatchParameters = AgentBatchBodyParameters

export type AgentBatchResponse = {
  object: "async_task"
  id: string
  status_url: string
  created_time: string
  operation: { surface: "rest" | "mcp"; name: string }
  status: "queued" | "running" | "retrying"
  poll_after_seconds: number
}

/**
 * Apply many agent operations
 */
export const agentBatch = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: ["operations"],

  path: (): string => `agents/batch`,
} as const

type CancelSessionPathParameters = {
  // The ID of the session to cancel.
  session_id: IdRequest
}

type CancelSessionBodyParameters = {
  // A session event identifying the turn to cancel. If omitted, cancels the current
  // nonterminal turn.
  event_id?: string
}

export type CancelSessionParameters = CancelSessionPathParameters &
  CancelSessionBodyParameters

export type CancelSessionResponse = {
  // Always `session`
  object: "session"
  id: string
  agent_id: string
  title: string
  // One of: `queued`, `in_progress`, `requires_action`, `completed`, `failed`, `canceled`,
  // `terminated`
  status:
    | "queued"
    | "in_progress"
    | "requires_action"
    | "completed"
    | "failed"
    | "canceled"
    | "terminated"
  created_at: string
  updated_at: string
  required_actions?: Array<{
    action_id: string
    title: string
    options: Array<{
      // One of: `approve`, `reject`
      id: "approve" | "reject"
      label: string
    }>
  }>
  error?: { code: string; message: string; retryable: boolean }
}

/**
 * Cancel a session
 */
export const cancelSession = {
  method: "post",
  pathParams: ["session_id"],
  queryParams: [],
  bodyParams: ["event_id"],

  path: (p: CancelSessionPathParameters): string =>
    `sessions/${p.session_id}/cancel`,
} as const

type ChatWithAgentPathParameters = {
  // The ID of the agent to chat with. Use a UUID for custom agents or `notion_ai` for
  // Notion Agent (personal agent); the reserved UUID
  // `33333333-3333-3333-3333-333333333333` remains supported for backward compatibility.
  agent_id: IdRequest | "notion_ai" | "33333333-3333-3333-3333-333333333333"
}

type ChatWithAgentQueryParameters = {
  // Whether to include verbose agent output (thinking, raw tool names, tool calls, and
  // tool results). Defaults to true.
  verbose?: boolean
}

type ChatWithAgentBodyParameters = {
  // The message to send to the agent.
  message?: string
  // An array of file uploads to attach to this chat turn. Use the File Upload APIs to
  // create uploads and pass their IDs here.
  attachments?: Array<{
    // ID of a FileUpload object that has the status `uploaded`.
    file_upload: {
      // ID of a FileUpload object that has the status `uploaded`.
      id: string
    }
    // The type of the attachment. Only supports "file_upload".
    type?: "file_upload"
    // An optional display name override for the attachment.
    name?: string
  }>
  // Optional caller-provided string metadata persisted with the user message. user_id is
  // used for lifecycle correlation and does not change authorization.
  metadata?: Record<string, string>
  // Additional caller-provided context for the agent to consider while responding.
  prompt_context?: string
  /** @deprecated */

  // Deprecated. Use POST /v1/threads/:thread_id/messages to continue an existing thread.
  // If not provided, a new thread will be created.
  thread_id?: IdRequest
}

export type ChatWithAgentParameters = ChatWithAgentPathParameters &
  ChatWithAgentQueryParameters &
  ChatWithAgentBodyParameters

export type ChatWithAgentResponse = {
  // Always `chat.invocation`
  object: "chat.invocation"
  agent_id: string
  thread_id: string
  invocation_id: string
  // Always `pending`
  status: "pending"
}

/**
 * Chat with agent
 */
export const chatWithAgent = {
  method: "post",
  pathParams: ["agent_id"],
  queryParams: ["verbose"],
  bodyParams: [
    "message",
    "attachments",
    "metadata",
    "prompt_context",
    "thread_id",
  ],

  path: (p: ChatWithAgentPathParameters): string => `agents/${p.agent_id}/chat`,
} as const

type ContinueThreadPathParameters = {
  // The ID of the thread.
  thread_id: IdRequest
}

type ContinueThreadBodyParameters =
  | {
      action_id: IdRequest
      // One of: `approve`, `reject`
      option_id: "approve" | "reject"
    }
  | {
      action_id: IdRequest
      // Always `use_connection`
      option_id: "use_connection"
      input: { connection_id: IdRequest }
    }

export type ContinueThreadParameters = ContinueThreadPathParameters &
  ContinueThreadBodyParameters

export type ContinueThreadResponse = {
  // Always `chat.invocation`
  object: "chat.invocation"
  agent_id: string
  thread_id: string
  invocation_id: string
  // Always `pending`
  status: "pending"
}

/**
 * Continue a thread
 */
export const continueThread = {
  method: "post",
  pathParams: ["thread_id"],
  queryParams: [],
  bodyParams: ["action_id", "option_id", "input"],

  path: (p: ContinueThreadPathParameters): string =>
    `threads/${p.thread_id}/continue`,
} as const

type CreateExternalAgentStubVaultPathParameters = {
  // The ID of the agent backing this external agent session.
  agent_id: IdRequest | "33333333-3333-3333-3333-333333333333"
}

type CreateExternalAgentStubVaultBodyParameters = {
  // Provider-defined vault name.
  name: string
  // Write-only credential input.
  credential: {
    // Write-only bearer credential.
    value: string
    // Credential expiry as an RFC 3339 instant.
    expires_at: string
  }
  // Credential target.
  target: {
    // MCP server target.
    type: "mcp_server"
    // The exact target server URL.
    server_url: string
    // Target authorization metadata.
    authorization: {
      // Bearer authorization.
      type: "bearer"
    }
  }
}

export type CreateExternalAgentStubVaultParameters =
  CreateExternalAgentStubVaultPathParameters &
    CreateExternalAgentStubVaultBodyParameters

export type CreateExternalAgentStubVaultResponse = {
  id: string
  name: string
  credential: { expires_at: string }
  target: {
    // Always `mcp_server`
    type: "mcp_server"
    server_url: string
    authorization: {
      // Always `bearer`
      type: "bearer"
    }
  }
  // One of: `active`, `expired`
  status: "active" | "expired"
  version: number
  created_at: string
  updated_at: string
}

/**
 * Create external agent stub vault
 */
export const createExternalAgentStubVault = {
  method: "post",
  pathParams: ["agent_id"],
  queryParams: [],
  bodyParams: ["name", "credential", "target"],

  path: (p: CreateExternalAgentStubVaultPathParameters): string =>
    `external_agent_stub/${p.agent_id}/vaults`,
} as const

type DeleteAgentPathParameters = {
  // The agent ID (a UUID), or `notion_ai` for the personal agent. The personal agent
  // cannot be deleted.
  agent_id: IdRequest | "notion_ai" | "33333333-3333-3333-3333-333333333333"
}

export type DeleteAgentParameters = DeleteAgentPathParameters

export type DeleteAgentResponse = {
  agent_id: IdResponse
  // Always "deleted": the agent has been soft-deleted (recoverable).
  status: "deleted"
  // ISO 8601 timestamp of when the agent was deleted.
  deleted_at: string
}

/**
 * Delete agent
 */
export const deleteAgent = {
  method: "delete",
  pathParams: ["agent_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: DeleteAgentPathParameters): string => `agents/${p.agent_id}`,
} as const

type GetAgentPathParameters = {
  // The agent ID (a UUID), or `notion_ai` for the personal agent. Endpoint-specific
  // restrictions still apply.
  agent_id: IdRequest | "notion_ai" | "33333333-3333-3333-3333-333333333333"
}

type GetAgentQueryParameters = {
  // Whether to include the agent's inline instructions. Defaults to false.
  verbose?: boolean
}

export type GetAgentParameters = GetAgentPathParameters &
  GetAgentQueryParameters

export type GetAgentResponse = {
  // Always `agent`
  object: "agent"
  id: IdResponse
  // What kind of agent this is: "notion_ai" is the personal agent; "custom_agent" is a
  // standalone agent you chat with; "autofill_custom_agent" fills a database property;
  // "external" runs through an external provider.
  agent_type:
    | "notion_ai"
    | "custom_agent"
    | "autofill_custom_agent"
    | "external"
  name: string
  description: string | null
  instructions_page_id: IdResponse | null
  icon:
    | PageIconResponse
    | {
        // Type of icon. In this case, a custom agent avatar.
        type: "custom_agent_avatar"
        // The static and animated URLs for the agent avatar.
        custom_agent_avatar: {
          // The URL of the static custom agent avatar.
          static_url: string
          // The URL of the animated custom agent avatar.
          animated_url: string
        }
      }
    | null
  // The model the agent runs on: auto (Notion selects) or a pinned model.
  model:
    | {
        // Always `auto`
        mode: "auto"
      }
    | {
        // Always `pinned`
        mode: "pinned"
        // The public model this agent maps to (e.g. "claude-sonnet-5"), or null for a
        // pre-release / early-access model.
        id: string | null
      }
  // Integrations the agent is connected to (Notion, Slack, Discord, MCP servers, and other
  // connectors), each with an account and per-target permissions.
  connections: Array<
    | {
        // Always `notion`
        type: "notion"
        name: string
        account: null
        permissions: Array<{
          target:
            | {
                // Always `page`
                type: "page"
                id: string
              }
            | {
                // Always `database_property`
                type: "database_property"
                data_source_id: string
                property_id: string
              }
            | {
                // Always `agent`
                type: "agent"
                id: string
              }
            | {
                // Always `workspace`
                type: "workspace"
              }
            | {
                // Always `owner_private_pages`
                type: "owner_private_pages"
              }
            | {
                // Always `web_search`
                type: "web_search"
                // Domains web search is restricted to, or null when unrestricted.
                allowed_domains: Array<string> | null
              }
            | {
                // Always `notion_help_docs_search`
                type: "notion_help_docs_search"
              }
          // Content roles ("reader" | "comment_only" | "read_and_write" | "editor") for scoped
          // targets, or search verbs ("allow" | "disallow") for the search targets.
          scopes: Array<string>
        }>
      }
    | {
        // Always `slack`
        type: "slack"
        name: string
        // The linked Slack workspace, null when none is linked, or "hidden" when the caller
        // lacks edit access to the agent.
        account:
          | {
              // Always `slack_workspace`
              type: "slack_workspace"
              team_id: string
            }
          | "hidden"
          | null
        permissions: Array<{
          target:
            | {
                // Always `slack_channel`
                type: "slack_channel"
                id: string
              }
            | {
                // Always `slack_all_public_channels`
                type: "slack_all_public_channels"
              }
            | {
                // Always `slack_all_channels`
                type: "slack_all_channels"
              }
          // Slack verbs granted on this target ("read" | "write" | "reply_in_thread" | "react").
          scopes: Array<string>
        }>
      }
    | {
        // Always `discord`
        type: "discord"
        name: string
        // The linked Discord server, null when none is linked, or "hidden" when the caller lacks
        // edit access to the agent.
        account:
          | {
              // Always `discord_server`
              type: "discord_server"
              id: string
            }
          | "hidden"
          | null
        permissions: Array<{
          target:
            | {
                // Always `discord_channel`
                type: "discord_channel"
                id: string
              }
            | {
                // Always `discord_all_channels`
                type: "discord_all_channels"
              }
          // Discord verbs granted on this target ("read" | "write" | "reply_in_thread" | "react").
          scopes: Array<string>
        }>
      }
    | {
        // Always `mcp_server`
        type: "mcp_server"
        name: string
        // The MCP server host, null when none is linked, or "hidden" when the caller lacks edit
        // access to the agent.
        account:
          | {
              // Always `mcp_server`
              type: "mcp_server"
              // The MCP server host (never the full URL, which can carry credentials or private path
              // components).
              server_host: string
            }
          | "hidden"
          | null
        // The tools the agent may call, null when all tools are enabled (including any the
        // server adds later), or "hidden" when the caller lacks edit access to the agent.
        enabled_tools:
          | Array<{ name: string; title: string | null }>
          | "hidden"
          | null
        // Whether read / write tool calls run without a confirmation step.
        run_tools_automatically: {
          // Whether read tool calls run without a confirmation step.
          read: boolean
          // Whether write tool calls run without a confirmation step.
          write: boolean
        }
      }
    | {
        // Always `custom_mcp_server`
        type: "custom_mcp_server"
        name: string
        // The MCP server host, null when none is linked, or "hidden" when the caller lacks edit
        // access to the agent.
        account:
          | {
              // Always `mcp_server`
              type: "mcp_server"
              // The MCP server host (never the full URL, which can carry credentials or private path
              // components).
              server_host: string
            }
          | "hidden"
          | null
        // The tools the agent may call, null when all tools are enabled (including any the
        // server adds later), or "hidden" when the caller lacks edit access to the agent.
        enabled_tools:
          | Array<{ name: string; title: string | null }>
          | "hidden"
          | null
        // Whether read / write tool calls run without a confirmation step.
        run_tools_automatically: {
          // Whether read tool calls run without a confirmation step.
          read: boolean
          // Whether write tool calls run without a confirmation step.
          write: boolean
        }
      }
    | {
        // The connector's machine name (e.g. "github", "google_drive").
        type:
          | "asana"
          | "box"
          | "browser"
          | "calendar"
          | "computer"
          | "confluence"
          | "cursor"
          | "files"
          | "fs"
          | "github"
          | "gmail"
          | "google_calendar"
          | "google_drive"
          | "google_drive_oauth"
          | "gtm"
          | "helpdocs"
          | "images"
          | "jira"
          | "linear"
          | "mail"
          | "marketplace"
          | "memory"
          | "microsoft_teams"
          | "outlook"
          | "salesforce"
          | "search"
          | "security"
          | "sharepoint"
          | "skills"
          | "system"
          | "test"
          | "web"
          | "webhooks"
          | "worker"
          | "workers"
        name: string
        // The provider-side account identifier, null when none is linked, or "hidden" when the
        // caller lacks edit access to the agent.
        account: string | null
        permissions: Array<{
          target: { type: string; id: string }
          // The scopes granted on this target.
          scopes: Array<string>
        }>
      }
  >
  // "active" when the agent can run; "disabled" when it is paused (see pause_reason);
  // "deleted" when it has been removed.
  status: "active" | "disabled" | "deleted"
  // Why the agent is paused when status is "disabled" (e.g. "credit_limit",
  // "disabled_from_workspace_settings"); null when active.
  pause_reason:
    | "run_limit"
    | "credit_limit"
    | "runaway_credit_usage"
    | "workspace_credit_limit"
    | "failure_limit"
    | "mark_session_failed_autopause"
    | "disabled_from_workspace_settings"
    | "disabled_from_api"
    | "disabled_from_agent_settings"
    | "disabled_due_to_no_members_with_access"
    | "disabled_due_to_lack_of_editors"
    | "disabled_by_notion"
    | "internal_error"
    | "needs_user_review"
    | "tool_unavailable"
    | null
  created_by: {
    // Always `user`
    object: "user"
    // Always `user`
    type: "user"
    // The ID of the user that created this agent.
    id: IdResponse
  } | null
  version: {
    // The ID of the published artifact.
    id: IdResponse
    // The version number.
    number: number
    // The ISO 8601 timestamp when this version was published.
    published_at: string
  } | null
  agent_version: {
    // The ID of the published artifact.
    id: IdResponse
    // The version number.
    number: number
    // The ISO 8601 timestamp when this version was published.
    published_at: string
  } | null
  // Whether the draft has edits not yet in the published version, or "hidden" when the
  // caller lacks edit access to the agent.
  has_unpublished_changes: boolean | "hidden"
  // ISO 8601 timestamp of the agent's most recent run, null if it has never run, or
  // "hidden" when the caller lacks edit access to the agent.
  last_run_time: string | "hidden" | null
  // ISO 8601 timestamp of the agent's most recent run, null if it has never run, or
  // "hidden" when the caller lacks edit access to the agent.
  last_run_at: string | "hidden" | null
  // The per-agent credit limit that applies to this agent, null when uncapped, or "hidden"
  // when the caller lacks full access to the agent. This is the effective limit computed
  // at runtime, folding in both the agent's own limit and any workspace-admin default.
  credit_limit: number | "hidden" | null
  // The agent's configured triggers, each with a machine type, an enabled flag, and (for
  // recurrence triggers) a structured schedule.
  triggers: Array<{
    // Machine trigger type (e.g. "notion.agent.mentioned", "recurrence",
    // "slack.reaction.added").
    type: string
    // Whether this trigger is currently enabled.
    enabled: boolean
    // Structured recurrence cadence. Present only for recurrence triggers.
    schedule?: {
      // Base cadence unit ("hour" | "day" | "week" | "month" | "year").
      frequency: string
      // Multiplier on the frequency (e.g. every 2 weeks).
      interval: number
      // Days of the week the schedule runs (e.g. "monday"). Present for weekly cadences and
      // monthly weekday restrictions.
      weekdays?: Array<string>
      // Days of the month the schedule runs. Present for monthly monthday restrictions.
      monthdays?: Array<number>
      // Week-of-month ordinals for a monthly weekday restriction (e.g. [2, 3] for the 2nd and
      // 3rd occurrence); -1 means the last week.
      week_numbers?: Array<number>
      // Hour of day (0–23) the schedule runs.
      hour?: number
      // Minute of the hour (0–59) the schedule runs.
      minute?: number
      // IANA timezone (e.g. "America/New_York").
      timezone?: string
      // ISO 8601 timestamp the schedule starts from.
      start_date?: string
      // When the schedule stops, when it is bounded.
      end?:
        | {
            // Always `date`
            type: "date"
            // ISO 8601 timestamp when the schedule stops.
            end_at: string
          }
        | {
            // Always `count`
            type: "count"
            // Number of occurrences after which the schedule stops.
            occurrences: number
          }
    }
    // Remaining per-type trigger configuration (e.g. watched channel ids, reaction config),
    // keys in snake_case. Present only when the trigger carries such state.
    config?: Record<string, Record<string, never>>
  }>
  // Date and time when this agent was created.
  created_time?: string
  // Date and time when this agent was last edited.
  last_edited_time?: string
  // The agent's inline instructions when verbose=true, or null when its instructions are
  // stored on a page.
  instructions?: string | null
}

/**
 * Get agent
 */
export const getAgent = {
  method: "get",
  pathParams: ["agent_id"],
  queryParams: ["verbose"],
  bodyParams: [],

  path: (p: GetAgentPathParameters): string => `agents/${p.agent_id}`,
} as const

type DeleteExternalAgentStubVaultPathParameters = {
  // The ID of the agent backing this external agent session.
  agent_id: IdRequest | "33333333-3333-3333-3333-333333333333"
  // The provider-owned vault ID.
  vault_id: string
}

export type DeleteExternalAgentStubVaultParameters =
  DeleteExternalAgentStubVaultPathParameters

export type DeleteExternalAgentStubVaultResponse = EmptyObject

/**
 * Delete external agent stub vault
 */
export const deleteExternalAgentStubVault = {
  method: "delete",
  pathParams: ["agent_id", "vault_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: DeleteExternalAgentStubVaultPathParameters): string =>
    `external_agent_stub/${p.agent_id}/vaults/${p.vault_id}`,
} as const

type UpdateExternalAgentStubVaultPathParameters = {
  // The ID of the agent backing this external agent session.
  agent_id: IdRequest | "33333333-3333-3333-3333-333333333333"
  // The provider-owned vault ID.
  vault_id: string
}

type UpdateExternalAgentStubVaultBodyParameters = {
  // The last observed vault version.
  expected_version: number
  // Replacement write-only credential.
  credential: {
    // Write-only bearer credential.
    value: string
    // Credential expiry as an RFC 3339 instant.
    expires_at: string
  }
}

export type UpdateExternalAgentStubVaultParameters =
  UpdateExternalAgentStubVaultPathParameters &
    UpdateExternalAgentStubVaultBodyParameters

export type UpdateExternalAgentStubVaultResponse = {
  id: string
  name: string
  credential: { expires_at: string }
  target: {
    // Always `mcp_server`
    type: "mcp_server"
    server_url: string
    authorization: {
      // Always `bearer`
      type: "bearer"
    }
  }
  // One of: `active`, `expired`
  status: "active" | "expired"
  version: number
  created_at: string
  updated_at: string
}

/**
 * Update external agent stub vault
 */
export const updateExternalAgentStubVault = {
  method: "patch",
  pathParams: ["agent_id", "vault_id"],
  queryParams: [],
  bodyParams: ["expected_version", "credential"],

  path: (p: UpdateExternalAgentStubVaultPathParameters): string =>
    `external_agent_stub/${p.agent_id}/vaults/${p.vault_id}`,
} as const

type GetInsightsPathParameters = {
  // The agent ID (a UUID), or `notion_ai` for the personal agent. Endpoint-specific
  // restrictions still apply.
  agent_id: IdRequest | "notion_ai" | "33333333-3333-3333-3333-333333333333"
}

type GetInsightsQueryParameters = {
  // Start of the insights window, as an epoch timestamp in seconds. Must be supplied
  // together with `end_time`; if either is omitted the window defaults to the current
  // billing period.
  start_time?: number
  // End of the insights window, as an epoch timestamp in seconds. Must be supplied
  // together with `start_time`; if either is omitted the window defaults to the current
  // billing period.
  end_time?: number
}

export type GetInsightsParameters = GetInsightsPathParameters &
  GetInsightsQueryParameters

export type GetInsightsResponse = {
  // Always `agent_insights`
  object: "agent_insights"
  id: IdResponse
  name: string
  // One of: `custom_agent`, `autofill_custom_agent`
  agent_type: "custom_agent" | "autofill_custom_agent"
  // One of: `active`, `disabled`, `deleted`
  status: "active" | "disabled" | "deleted"
  pause_reason:
    | "run_limit"
    | "credit_limit"
    | "runaway_credit_usage"
    | "workspace_credit_limit"
    | "failure_limit"
    | "mark_session_failed_autopause"
    | "disabled_from_workspace_settings"
    | "disabled_from_api"
    | "disabled_from_agent_settings"
    | "disabled_due_to_no_members_with_access"
    | "disabled_due_to_lack_of_editors"
    | "disabled_by_notion"
    | "internal_error"
    | "needs_user_review"
    | "tool_unavailable"
    | null
  created_by: {
    id: string
    // One of: `user`, `bot`
    type: "user" | "bot"
  } | null
  // Premium AI credits consumed by this agent within the window.
  total_credits_used: number
  // Enforced per-agent credit limit; null when none is configured, and "hidden" when the
  // caller lacks full access to the agent.
  credit_limit: number | "hidden" | null
  // Number of runs recorded for this agent within the window.
  runs_completed: number
}

/**
 * Get agent insights
 */
export const getInsights = {
  method: "get",
  pathParams: ["agent_id"],
  queryParams: ["start_time", "end_time"],
  bodyParams: [],

  path: (p: GetInsightsPathParameters): string =>
    `agents/${p.agent_id}/insights`,
} as const

type ListAgentsQueryParameters = {
  // Filter agents by name (case-insensitive substring match).
  name?: string
  // Filter agents by one or more agent types.
  agent_type?: Array<
    "notion_ai" | "custom_agent" | "autofill_custom_agent" | "external"
  >
  // Filter agents by one or more agent IDs. Use `notion_ai` for Notion Agent (personal
  // agent).
  agent_ids?: Array<
    IdRequest | "notion_ai" | "33333333-3333-3333-3333-333333333333"
  >
  // Filter agents by one or more creator IDs. Use "me" for the user associated with the
  // API token.
  created_by?: Array<IdRequest | "me">
  // If supplied, this endpoint will return a page of results starting after the cursor
  // provided. If not supplied, this endpoint will return the first page of results.
  start_cursor?: string | null
  // The number of items from the full list desired in the response. Maximum: 100
  page_size?: number
  // Whether to include inline instructions for each agent. Defaults to false.
  verbose?: boolean
}

export type ListAgentsParameters = ListAgentsQueryParameters

export type ListAgentsResponse = {
  // Always `list`
  object: "list"
  // Always `agent`
  type: "agent"
  results: Array<{
    // Always `agent`
    object: "agent"
    id: IdResponse
    // Agent kind: the Notion AI personal agent, a custom agent, a database autofill custom
    // agent, or an external agent.
    agent_type:
      | "notion_ai"
      | "custom_agent"
      | "autofill_custom_agent"
      | "external"
    name: string
    description: string | null
    instructions_page_id: IdResponse | null
    icon:
      | PageIconResponse
      | {
          // Type of icon. In this case, a custom agent avatar.
          type: "custom_agent_avatar"
          // The static and animated URLs for the agent avatar.
          custom_agent_avatar: {
            // The URL of the static custom agent avatar.
            static_url: string
            // The URL of the animated custom agent avatar.
            animated_url: string
          }
        }
      | null
    version: {
      // The ID of the published artifact.
      id: IdResponse
      // The version number.
      number: number
      // The ISO 8601 timestamp when this version was published.
      published_at: string
    } | null
    agent_version: {
      // The ID of the published artifact.
      id: IdResponse
      // The version number.
      number: number
      // The ISO 8601 timestamp when this version was published.
      published_at: string
    } | null
    // The model the agent runs on: auto (Notion selects) or a pinned model.
    model:
      | {
          // Always `auto`
          mode: "auto"
        }
      | {
          // Always `pinned`
          mode: "pinned"
          // The public model this agent maps to (e.g. "claude-sonnet-5"), or null for a
          // pre-release / early-access model.
          id: string | null
        }
    // Non-Notion integrations the agent is connected to, using the same account and
    // permission shape as get agent.
    connections: Array<
      | {
          // Always `notion`
          type: "notion"
          name: string
          account: null
          permissions: Array<{
            target:
              | {
                  // Always `page`
                  type: "page"
                  id: string
                }
              | {
                  // Always `database_property`
                  type: "database_property"
                  data_source_id: string
                  property_id: string
                }
              | {
                  // Always `agent`
                  type: "agent"
                  id: string
                }
              | {
                  // Always `workspace`
                  type: "workspace"
                }
              | {
                  // Always `owner_private_pages`
                  type: "owner_private_pages"
                }
              | {
                  // Always `web_search`
                  type: "web_search"
                  // Domains web search is restricted to, or null when unrestricted.
                  allowed_domains: Array<string> | null
                }
              | {
                  // Always `notion_help_docs_search`
                  type: "notion_help_docs_search"
                }
            // Content roles ("reader" | "comment_only" | "read_and_write" | "editor") for scoped
            // targets, or search verbs ("allow" | "disallow") for the search targets.
            scopes: Array<string>
          }>
        }
      | {
          // Always `slack`
          type: "slack"
          name: string
          // The linked Slack workspace, null when none is linked, or "hidden" when the caller
          // lacks edit access to the agent.
          account:
            | {
                // Always `slack_workspace`
                type: "slack_workspace"
                team_id: string
              }
            | "hidden"
            | null
          permissions: Array<{
            target:
              | {
                  // Always `slack_channel`
                  type: "slack_channel"
                  id: string
                }
              | {
                  // Always `slack_all_public_channels`
                  type: "slack_all_public_channels"
                }
              | {
                  // Always `slack_all_channels`
                  type: "slack_all_channels"
                }
            // Slack verbs granted on this target ("read" | "write" | "reply_in_thread" | "react").
            scopes: Array<string>
          }>
        }
      | {
          // Always `discord`
          type: "discord"
          name: string
          // The linked Discord server, null when none is linked, or "hidden" when the caller lacks
          // edit access to the agent.
          account:
            | {
                // Always `discord_server`
                type: "discord_server"
                id: string
              }
            | "hidden"
            | null
          permissions: Array<{
            target:
              | {
                  // Always `discord_channel`
                  type: "discord_channel"
                  id: string
                }
              | {
                  // Always `discord_all_channels`
                  type: "discord_all_channels"
                }
            // Discord verbs granted on this target ("read" | "write" | "reply_in_thread" | "react").
            scopes: Array<string>
          }>
        }
      | {
          // Always `mcp_server`
          type: "mcp_server"
          name: string
          // The MCP server host, null when none is linked, or "hidden" when the caller lacks edit
          // access to the agent.
          account:
            | {
                // Always `mcp_server`
                type: "mcp_server"
                // The MCP server host (never the full URL, which can carry credentials or private path
                // components).
                server_host: string
              }
            | "hidden"
            | null
          // The tools the agent may call, null when all tools are enabled (including any the
          // server adds later), or "hidden" when the caller lacks edit access to the agent.
          enabled_tools:
            | Array<{ name: string; title: string | null }>
            | "hidden"
            | null
          // Whether read / write tool calls run without a confirmation step.
          run_tools_automatically: {
            // Whether read tool calls run without a confirmation step.
            read: boolean
            // Whether write tool calls run without a confirmation step.
            write: boolean
          }
        }
      | {
          // Always `custom_mcp_server`
          type: "custom_mcp_server"
          name: string
          // The MCP server host, null when none is linked, or "hidden" when the caller lacks edit
          // access to the agent.
          account:
            | {
                // Always `mcp_server`
                type: "mcp_server"
                // The MCP server host (never the full URL, which can carry credentials or private path
                // components).
                server_host: string
              }
            | "hidden"
            | null
          // The tools the agent may call, null when all tools are enabled (including any the
          // server adds later), or "hidden" when the caller lacks edit access to the agent.
          enabled_tools:
            | Array<{ name: string; title: string | null }>
            | "hidden"
            | null
          // Whether read / write tool calls run without a confirmation step.
          run_tools_automatically: {
            // Whether read tool calls run without a confirmation step.
            read: boolean
            // Whether write tool calls run without a confirmation step.
            write: boolean
          }
        }
      | {
          // The connector's machine name (e.g. "github", "google_drive").
          type:
            | "asana"
            | "box"
            | "browser"
            | "calendar"
            | "computer"
            | "confluence"
            | "cursor"
            | "files"
            | "fs"
            | "github"
            | "gmail"
            | "google_calendar"
            | "google_drive"
            | "google_drive_oauth"
            | "gtm"
            | "helpdocs"
            | "images"
            | "jira"
            | "linear"
            | "mail"
            | "marketplace"
            | "memory"
            | "microsoft_teams"
            | "outlook"
            | "salesforce"
            | "search"
            | "security"
            | "sharepoint"
            | "skills"
            | "system"
            | "test"
            | "web"
            | "webhooks"
            | "worker"
            | "workers"
          name: string
          // The provider-side account identifier, null when none is linked, or "hidden" when the
          // caller lacks edit access to the agent.
          account: string | null
          permissions: Array<{
            target: { type: string; id: string }
            // The scopes granted on this target.
            scopes: Array<string>
          }>
        }
    >
    // Agent status. Disabled agents remain listed; deleted agents are currently excluded
    // from list responses.
    status: "active" | "disabled" | "deleted"
    created_by: {
      // Always `user`
      object: "user"
      // Always `user`
      type: "user"
      // The ID of the user that created this agent.
      id: IdResponse
    } | null
    // Date and time when this agent was created, or null for the personal agent.
    created_time: string | null
    // Date and time when this agent was last edited, or null for the personal agent.
    last_edited_time: string | null
    // Date and time when this agent was last invoked, null when no invocation is available,
    // or "hidden" when the caller lacks edit access to the agent.
    last_run_time: string | "hidden" | null
    // Date and time when this agent was last invoked, null when no invocation is available,
    // or "hidden" when the caller lacks edit access to the agent.
    last_run_at: string | "hidden" | null
    // The agent's inline instructions when verbose=true, or null when its instructions are
    // stored on a page.
    instructions?: string | null
  }>
  has_more: boolean
  next_cursor: string | null
}

/**
 * List agents
 */
export const listAgents = {
  method: "get",
  pathParams: [],
  queryParams: [
    "name",
    "agent_type",
    "agent_ids",
    "created_by",
    "start_cursor",
    "page_size",
    "verbose",
  ],
  bodyParams: [],

  path: (): string => `agents`,
} as const

type ListExternalAgentStubSessionEventsPathParameters = {
  // The ID of the agent backing this external agent session.
  agent_id: IdRequest | "33333333-3333-3333-3333-333333333333"
  // The provider-owned session ID returned when the session was created.
  session_id: IdRequest
}

type ListExternalAgentStubSessionEventsQueryParameters = {
  // Opaque cursor returned by a previous call. Only events strictly after this cursor are
  // returned.
  cursor?: string
}

export type ListExternalAgentStubSessionEventsParameters =
  ListExternalAgentStubSessionEventsPathParameters &
    ListExternalAgentStubSessionEventsQueryParameters

export type ListExternalAgentStubSessionEventsResponse = {
  events: Array<
    | {
        // Always `assistant.thinking`
        type: "assistant.thinking"
        text: string
      }
    | {
        // Always `assistant.message`
        type: "assistant.message"
        text: string
      }
    | {
        // Always `tool.started`
        type: "tool.started"
        tool_call_id: string
        tool_name?: string
        input?: Record<string, never>
      }
    | {
        // Always `tool.output`
        type: "tool.output"
        tool_call_id: string
        output?: Record<string, never>
        is_error?: boolean
      }
    | {
        // Always `error`
        type: "error"
        error: {
          code: string
          message: string
          retryable: boolean
          additional_data?: Record<string, string | Array<string>>
        }
      }
  >
  is_running: boolean
  next_cursor?: string
}

/**
 * List external agent stub session events
 */
export const listExternalAgentStubSessionEvents = {
  method: "get",
  pathParams: ["agent_id", "session_id"],
  queryParams: ["cursor"],
  bodyParams: [],

  path: (p: ListExternalAgentStubSessionEventsPathParameters): string =>
    `external_agent_stub/${p.agent_id}/sessions/${p.session_id}/events`,
} as const

type ListThreadMessagesPathParameters = {
  // The ID of the thread.
  thread_id: IdRequest
}

type ListThreadMessagesQueryParameters = {
  // Whether to include verbose agent output (thinking, raw tool names, tool calls, and
  // tool results). Defaults to true.
  verbose?: boolean
  // Filter messages by role (user or agent).
  role?: "user" | "agent"
  // If supplied, this endpoint will return a page of results starting after the cursor
  // provided. If not supplied, this endpoint will return the first page of results.
  start_cursor?: string | null
  // The number of items from the full list desired in the response. Maximum: 100
  page_size?: number
}

export type ListThreadMessagesParameters = ListThreadMessagesPathParameters &
  ListThreadMessagesQueryParameters

export type ListThreadMessagesResponse = {
  // Always `list`
  object: "list"
  // Always `thread_message`
  type: "thread_message"
  results: Array<{
    // Always `thread_message`
    object: "thread_message"
    id: IdResponse
    // One of: `user`, `agent`
    role: "user" | "agent"
    content: string
    // Date and time when this message was created.
    created_time: string
    parent: {
      // The parent type.
      type: "thread"
      // The ID of the parent thread.
      id: IdResponse
    }
    attachments?: Array<{
      name: string
      content_type: string
      url: string
      // The time when the attachment URL will expire.
      expiry_time?: string
    }>
    content_parts?: Array<
      | {
          // Always `text`
          type: "text"
          text: string
        }
      | {
          // Always `thinking`
          type: "thinking"
          text: string
        }
      | {
          // Always `tool_call`
          type: "tool_call"
          tool_call_id: string | null
          tool_name: string
          input: string
          results?: Array<{
            id: IdResponse
            agent_step_id: IdResponse | null
            tool_call_id: string | null
            tool_name: string
            tool_type: string
            state: string
            input: Record<string, never> | null
            output: Record<string, never> | null
            error: string | null
            started_at: number
            finished_at: number | null
            duration_ms: number | null
          }>
        }
      | {
          // Always `follow_ups`
          type: "follow_ups"
          follow_ups: Array<{ label: string; message: string }>
        }
      | {
          // Always `custom_agent_template_picker`
          type: "custom_agent_template_picker"
        }
    >
    pending_user_actions?: Array<{
      id: IdResponse
      // Always `tool_confirmation`
      type: "tool_confirmation"
      title: string
      requirements: Array<
        | {
            // Always `general`
            type: "general"
          }
        | {
            // Always `manage_workers`
            type: "manage_workers"
          }
        | {
            // Always `url_safety`
            type: "url_safety"
            urls: Array<string>
            required_by_workspace_policy?: boolean
          }
        | {
            // Always `permission_escalation`
            type: "permission_escalation"
            destination_title?: string
            source_titles?: Array<string>
          }
        | {
            // Always `delete_content`
            type: "delete_content"
            page_count: number
            database_count: number
            meeting_notes_block_count?: number
          }
        | {
            // Always `connect_integration`
            type: "connect_integration"
            integration_type: string
            integration_name: string
            handoff_url: string
          }
        | {
            // Always `admin_mode`
            type: "admin_mode"
            explanation?: string
          }
      >
      options: Array<
        | {
            // Always `approve`
            id: "approve"
            label: string
          }
        | {
            // Always `reject`
            id: "reject"
            label: string
          }
        | {
            // Always `use_connection`
            id: "use_connection"
            label: string
            input: {
              // Always `connection_id`
              type: "connection_id"
              // Always `true`
              required: true
            }
          }
      >
    }>
  }>
  has_more: boolean
  next_cursor: string | null
}

/**
 * List thread messages
 */
export const listThreadMessages = {
  method: "get",
  pathParams: ["thread_id"],
  queryParams: ["verbose", "role", "start_cursor", "page_size"],
  bodyParams: [],

  path: (p: ListThreadMessagesPathParameters): string =>
    `threads/${p.thread_id}/messages`,
} as const

type SendThreadMessagePathParameters = {
  // The ID of the thread.
  thread_id: IdRequest
}

type SendThreadMessageBodyParameters = {
  // The message to send to the agent.
  message?: string
  // An array of file uploads to attach to this chat turn. Use the File Upload APIs to
  // create uploads and pass their IDs here.
  attachments?: Array<{
    // ID of a FileUpload object that has the status `uploaded`.
    file_upload: {
      // ID of a FileUpload object that has the status `uploaded`.
      id: string
    }
    // The type of the attachment. Only supports "file_upload".
    type?: "file_upload"
    // An optional display name override for the attachment.
    name?: string
  }>
  // Optional caller-provided string metadata persisted with the user message. user_id is
  // used for lifecycle correlation and does not change authorization.
  metadata?: Record<string, string>
  // Additional caller-provided context for the agent to consider while responding.
  prompt_context?: string
}

export type SendThreadMessageParameters = SendThreadMessagePathParameters &
  SendThreadMessageBodyParameters

export type SendThreadMessageResponse = {
  // Always `chat.invocation`
  object: "chat.invocation"
  agent_id: string
  thread_id: string
  invocation_id: string
  // Always `pending`
  status: "pending"
}

/**
 * Send a thread message
 */
export const sendThreadMessage = {
  method: "post",
  pathParams: ["thread_id"],
  queryParams: [],
  bodyParams: ["message", "attachments", "metadata", "prompt_context"],

  path: (p: SendThreadMessagePathParameters): string =>
    `threads/${p.thread_id}/messages`,
} as const

type ListThreadsPathParameters = {
  // The ID of the agent. Use a UUID for custom agents or `notion_ai` for Notion Agent
  // (personal agent); the reserved UUID `33333333-3333-3333-3333-333333333333` remains
  // supported for backward compatibility.
  agent_id: IdRequest | "notion_ai" | "33333333-3333-3333-3333-333333333333"
}

type ListThreadsQueryParameters = {
  // Filter threads by ID (exact match).
  id?: IdRequest
  // Filter threads by title (case-insensitive substring match).
  title?: string
  // Filter threads by status.
  status?: "pending" | "requires_action" | "completed" | "failed"
  // Filter threads by agent activity state. Defaults to `all`.
  activity?: "all" | "pending" | "in_progress" | "failed" | "success"
  // Filter threads by one or more creator IDs. Use "me" for the API bot and user
  // associated with the API token.
  created_by?: Array<IdRequest | "me">
  // Filter threads by one or more IDs of actors who last used them. Use "me" for the API
  // bot and user associated with the API token.
  last_used_by?: Array<IdRequest | "me">
  // Timestamp used to sort threads. Defaults to `created_time`.
  sort_by?: "created_time" | "last_used_time"
  // Sort direction. Defaults to `descending`.
  sort_direction?: "ascending" | "descending"
  // If supplied, this endpoint will return a page of results starting after the cursor
  // provided. If not supplied, this endpoint will return the first page of results.
  start_cursor?: string | null
  // The number of items from the full list desired in the response. Maximum: 100
  page_size?: number
}

export type ListThreadsParameters = ListThreadsPathParameters &
  ListThreadsQueryParameters

export type ListThreadsResponse = {
  // Always `list`
  object: "list"
  // Always `thread`
  type: "thread"
  results: Array<{
    // Always `thread`
    object: "thread"
    id: IdResponse
    title: string
    // One of: `pending`, `requires_action`, `completed`, `failed`
    status: "pending" | "requires_action" | "completed" | "failed"
    // Date and time when this thread was created.
    created_time: string
    // Date and time when this thread was last updated.
    last_edited_time: string
    created_by: {
      // The ID of the actor that created this thread: a bot for an integration-created thread,
      // a user for one created in the Notion app.
      id: IdResponse
      // The creator type. Threads a caller can see because it has access to the agent, such as
      // a trigger's runs or a teammate's chats, may be created by either a bot or a user.
      type: "bot" | "user"
    }
    agent_version: {
      // The ID of the published artifact.
      id: IdResponse
      // The version number.
      number: number
      // The ISO 8601 timestamp when this version was published.
      published_at: string
    } | null
    models:
      | {
          // Always `auto`
          type: "auto"
        }
      | {
          // Always `pinned`
          type: "pinned"
          // The public model this thread is pinned to (e.g. "claude-sonnet-5"), with null for a
          // pre-release / early-access model. Empty when the thread has no model recorded yet.
          // Reflects the thread's configuration at creation, so a model changed mid-conversation
          // is not reflected here.
          ids: Array<string | null>
        }
    error?: string
    // How this thread started: the type of the trigger that ran it, or "chat".
    trigger_type?: string
    // Labels describing how the thread ran (triggered, chat, setup). Null when the caller
    // lacks edit access to the agent.
    type_labels?: Array<string> | null
    // Emails of the users who participated in this thread. Null when the caller lacks edit
    // access to the agent.
    chat_user_emails?: Array<string> | null
    // Types of tool this thread called. Null when the caller lacks edit access to the agent.
    tool_types?: Array<string> | null
    // Number of tool calls in this thread. Null when the caller lacks edit access to the
    // agent.
    tool_call_count?: number | null
    // Premium AI credits this thread consumed. Null when the caller lacks edit access to the
    // agent.
    credits_used?: number | null
    // Runs completed in this thread. Null when the caller lacks edit access to the agent, or
    // when the thread predates run tracking.
    runs_completed?: number | null
    pending_user_actions?: Array<{
      id: IdResponse
      // Always `tool_confirmation`
      type: "tool_confirmation"
      title: string
      requirements: Array<
        | {
            // Always `general`
            type: "general"
          }
        | {
            // Always `manage_workers`
            type: "manage_workers"
          }
        | {
            // Always `url_safety`
            type: "url_safety"
            urls: Array<string>
            required_by_workspace_policy?: boolean
          }
        | {
            // Always `permission_escalation`
            type: "permission_escalation"
            destination_title?: string
            source_titles?: Array<string>
          }
        | {
            // Always `delete_content`
            type: "delete_content"
            page_count: number
            database_count: number
            meeting_notes_block_count?: number
          }
        | {
            // Always `connect_integration`
            type: "connect_integration"
            integration_type: string
            integration_name: string
            handoff_url: string
          }
        | {
            // Always `admin_mode`
            type: "admin_mode"
            explanation?: string
          }
      >
      options: Array<
        | {
            // Always `approve`
            id: "approve"
            label: string
          }
        | {
            // Always `reject`
            id: "reject"
            label: string
          }
        | {
            // Always `use_connection`
            id: "use_connection"
            label: string
            input: {
              // Always `connection_id`
              type: "connection_id"
              // Always `true`
              required: true
            }
          }
      >
    }>
  }>
  has_more: boolean
  next_cursor: string | null
}

/**
 * List threads
 */
export const listThreads = {
  method: "get",
  pathParams: ["agent_id"],
  queryParams: [
    "id",
    "title",
    "status",
    "activity",
    "created_by",
    "last_used_by",
    "sort_by",
    "sort_direction",
    "start_cursor",
    "page_size",
  ],
  bodyParams: [],

  path: (p: ListThreadsPathParameters): string =>
    `agents/${p.agent_id}/threads`,
} as const

type QueryAgentsBodyParameters = {
  // Search agent names and descriptions using a case-insensitive substring match.
  query?: string
  // Filter agents by public properties, optionally combined with and/or.
  filter?:
    | { property: "id"; id: { equals: string } }
    | {
        property: "agent_type"
        string: {
          equals: "notion_ai" | "custom_agent" | "autofill_custom_agent"
        }
      }
    | { property: "created_by"; people: { contains: string } }
    | { property: "created_time"; date: { after?: string; before?: string } }
    | { property: "favorited"; checkbox: { equals: boolean } }
    | { property: "connections"; mcp_server: { contains: string } }
    | {
        property: "status"
        status: { in: Array<"active" | "disabled" | "deleted"> }
      }
    | { property: "model_mode"; select: { equals: "auto" | "pinned" } }
    | { property: "agent_version"; number: { equals: number } }
    | { property: "last_run_at"; date: { after?: string; before?: string } }
    | {
        and: Array<
          | { property: "id"; id: { equals: string } }
          | {
              property: "agent_type"
              string: {
                equals: "notion_ai" | "custom_agent" | "autofill_custom_agent"
              }
            }
          | { property: "created_by"; people: { contains: string } }
          | {
              property: "created_time"
              date: { after?: string; before?: string }
            }
          | { property: "favorited"; checkbox: { equals: boolean } }
          | { property: "connections"; mcp_server: { contains: string } }
          | {
              property: "status"
              status: { in: Array<"active" | "disabled" | "deleted"> }
            }
          | { property: "model_mode"; select: { equals: "auto" | "pinned" } }
          | { property: "agent_version"; number: { equals: number } }
          | {
              property: "last_run_at"
              date: { after?: string; before?: string }
            }
          | {
              and: Array<
                | { property: "id"; id: { equals: string } }
                | {
                    property: "agent_type"
                    string: {
                      equals:
                        | "notion_ai"
                        | "custom_agent"
                        | "autofill_custom_agent"
                    }
                  }
                | { property: "created_by"; people: { contains: string } }
                | {
                    property: "created_time"
                    date: { after?: string; before?: string }
                  }
                | { property: "favorited"; checkbox: { equals: boolean } }
                | { property: "connections"; mcp_server: { contains: string } }
                | {
                    property: "status"
                    status: { in: Array<"active" | "disabled" | "deleted"> }
                  }
                | {
                    property: "model_mode"
                    select: { equals: "auto" | "pinned" }
                  }
                | { property: "agent_version"; number: { equals: number } }
                | {
                    property: "last_run_at"
                    date: { after?: string; before?: string }
                  }
              >
            }
          | {
              or: Array<
                | { property: "id"; id: { equals: string } }
                | {
                    property: "agent_type"
                    string: {
                      equals:
                        | "notion_ai"
                        | "custom_agent"
                        | "autofill_custom_agent"
                    }
                  }
                | { property: "created_by"; people: { contains: string } }
                | {
                    property: "created_time"
                    date: { after?: string; before?: string }
                  }
                | { property: "favorited"; checkbox: { equals: boolean } }
                | { property: "connections"; mcp_server: { contains: string } }
                | {
                    property: "status"
                    status: { in: Array<"active" | "disabled" | "deleted"> }
                  }
                | {
                    property: "model_mode"
                    select: { equals: "auto" | "pinned" }
                  }
                | { property: "agent_version"; number: { equals: number } }
                | {
                    property: "last_run_at"
                    date: { after?: string; before?: string }
                  }
              >
            }
        >
      }
    | {
        or: Array<
          | { property: "id"; id: { equals: string } }
          | {
              property: "agent_type"
              string: {
                equals: "notion_ai" | "custom_agent" | "autofill_custom_agent"
              }
            }
          | { property: "created_by"; people: { contains: string } }
          | {
              property: "created_time"
              date: { after?: string; before?: string }
            }
          | { property: "favorited"; checkbox: { equals: boolean } }
          | { property: "connections"; mcp_server: { contains: string } }
          | {
              property: "status"
              status: { in: Array<"active" | "disabled" | "deleted"> }
            }
          | { property: "model_mode"; select: { equals: "auto" | "pinned" } }
          | { property: "agent_version"; number: { equals: number } }
          | {
              property: "last_run_at"
              date: { after?: string; before?: string }
            }
          | {
              and: Array<
                | { property: "id"; id: { equals: string } }
                | {
                    property: "agent_type"
                    string: {
                      equals:
                        | "notion_ai"
                        | "custom_agent"
                        | "autofill_custom_agent"
                    }
                  }
                | { property: "created_by"; people: { contains: string } }
                | {
                    property: "created_time"
                    date: { after?: string; before?: string }
                  }
                | { property: "favorited"; checkbox: { equals: boolean } }
                | { property: "connections"; mcp_server: { contains: string } }
                | {
                    property: "status"
                    status: { in: Array<"active" | "disabled" | "deleted"> }
                  }
                | {
                    property: "model_mode"
                    select: { equals: "auto" | "pinned" }
                  }
                | { property: "agent_version"; number: { equals: number } }
                | {
                    property: "last_run_at"
                    date: { after?: string; before?: string }
                  }
              >
            }
          | {
              or: Array<
                | { property: "id"; id: { equals: string } }
                | {
                    property: "agent_type"
                    string: {
                      equals:
                        | "notion_ai"
                        | "custom_agent"
                        | "autofill_custom_agent"
                    }
                  }
                | { property: "created_by"; people: { contains: string } }
                | {
                    property: "created_time"
                    date: { after?: string; before?: string }
                  }
                | { property: "favorited"; checkbox: { equals: boolean } }
                | { property: "connections"; mcp_server: { contains: string } }
                | {
                    property: "status"
                    status: { in: Array<"active" | "disabled" | "deleted"> }
                  }
                | {
                    property: "model_mode"
                    select: { equals: "auto" | "pinned" }
                  }
                | { property: "agent_version"; number: { equals: number } }
                | {
                    property: "last_run_at"
                    date: { after?: string; before?: string }
                  }
              >
            }
        >
      }
  // Ordered sort precedence. Defaults to created_time descending.
  sorts?: Array<{
    // Timestamp used to sort agents.
    property: "created_time" | "last_run_at"
    // Sort direction.
    direction: "ascending" | "descending"
  }>
  // Opaque continuation cursor from the previous page.
  start_cursor?: string | null
  // Number of agents to return. Maximum: 100.
  page_size?: number
  // Whether to include inline instructions for each agent. Defaults to false.
  verbose?: boolean
  // Whether to include soft-deleted agents. Defaults to false.
  include_deleted?: boolean
}

export type QueryAgentsParameters = QueryAgentsBodyParameters

export type QueryAgentsResponse = {
  // Always `list`
  object: "list"
  // Always `agent`
  type: "agent"
  results: Array<
    | {
        // Always `agent`
        object: "agent"
        id: IdResponse
        // What kind of agent this is: "custom_agent" is a standalone agent you chat with;
        // "autofill_custom_agent" fills a database property.
        agent_type: "custom_agent" | "autofill_custom_agent"
        name: string
        description: string | null
        instructions_page_id: IdResponse | null
        icon:
          | PageIconResponse
          | {
              // Type of icon. In this case, a custom agent avatar.
              type: "custom_agent_avatar"
              // The static and animated URLs for the agent avatar.
              custom_agent_avatar: {
                // The URL of the static custom agent avatar.
                static_url: string
                // The URL of the animated custom agent avatar.
                animated_url: string
              }
            }
          | null
        // The model selection: automatic, or pinned to a public model ID.
        model:
          | {
              // Always `auto`
              mode: "auto"
            }
          | {
              // Always `pinned`
              mode: "pinned"
              // The public model this agent maps to (e.g. "claude-sonnet-5"), or null for a
              // pre-release / early-access model.
              id: string | null
            }
        // Integrations the agent is connected to (Notion, Slack, Discord, MCP servers, and other
        // connectors), each with an account and per-target permissions.
        connections: Array<
          | {
              // Always `notion`
              type: "notion"
              name: string
              account: null
              permissions: Array<{
                target:
                  | {
                      // Always `page`
                      type: "page"
                      id: string
                    }
                  | {
                      // Always `database_property`
                      type: "database_property"
                      data_source_id: string
                      property_id: string
                    }
                  | {
                      // Always `agent`
                      type: "agent"
                      id: string
                    }
                  | {
                      // Always `workspace`
                      type: "workspace"
                    }
                  | {
                      // Always `owner_private_pages`
                      type: "owner_private_pages"
                    }
                  | {
                      // Always `web_search`
                      type: "web_search"
                      // Domains web search is restricted to, or null when unrestricted.
                      allowed_domains: Array<string> | null
                    }
                  | {
                      // Always `notion_help_docs_search`
                      type: "notion_help_docs_search"
                    }
                // Content roles ("reader" | "comment_only" | "read_and_write" | "editor") for scoped
                // targets, or search verbs ("allow" | "disallow") for the search targets.
                scopes: Array<string>
              }>
            }
          | {
              // Always `slack`
              type: "slack"
              name: string
              // The linked Slack workspace, null when none is linked, or "hidden" when the caller
              // lacks edit access to the agent.
              account:
                | {
                    // Always `slack_workspace`
                    type: "slack_workspace"
                    team_id: string
                  }
                | "hidden"
                | null
              permissions: Array<{
                target:
                  | {
                      // Always `slack_channel`
                      type: "slack_channel"
                      id: string
                    }
                  | {
                      // Always `slack_all_public_channels`
                      type: "slack_all_public_channels"
                    }
                  | {
                      // Always `slack_all_channels`
                      type: "slack_all_channels"
                    }
                // Slack verbs granted on this target ("read" | "write" | "reply_in_thread" | "react").
                scopes: Array<string>
              }>
            }
          | {
              // Always `discord`
              type: "discord"
              name: string
              // The linked Discord server, null when none is linked, or "hidden" when the caller lacks
              // edit access to the agent.
              account:
                | {
                    // Always `discord_server`
                    type: "discord_server"
                    id: string
                  }
                | "hidden"
                | null
              permissions: Array<{
                target:
                  | {
                      // Always `discord_channel`
                      type: "discord_channel"
                      id: string
                    }
                  | {
                      // Always `discord_all_channels`
                      type: "discord_all_channels"
                    }
                // Discord verbs granted on this target ("read" | "write" | "reply_in_thread" | "react").
                scopes: Array<string>
              }>
            }
          | {
              // Always `mcp_server`
              type: "mcp_server"
              name: string
              // The MCP server host, null when none is linked, or "hidden" when the caller lacks edit
              // access to the agent.
              account:
                | {
                    // Always `mcp_server`
                    type: "mcp_server"
                    // The MCP server host (never the full URL, which can carry credentials or private path
                    // components).
                    server_host: string
                  }
                | "hidden"
                | null
              // The tools the agent may call, null when all tools are enabled (including any the
              // server adds later), or "hidden" when the caller lacks edit access to the agent.
              enabled_tools:
                | Array<{ name: string; title: string | null }>
                | "hidden"
                | null
              // Whether read / write tool calls run without a confirmation step.
              run_tools_automatically: {
                // Whether read tool calls run without a confirmation step.
                read: boolean
                // Whether write tool calls run without a confirmation step.
                write: boolean
              }
            }
          | {
              // Always `custom_mcp_server`
              type: "custom_mcp_server"
              name: string
              // The MCP server host, null when none is linked, or "hidden" when the caller lacks edit
              // access to the agent.
              account:
                | {
                    // Always `mcp_server`
                    type: "mcp_server"
                    // The MCP server host (never the full URL, which can carry credentials or private path
                    // components).
                    server_host: string
                  }
                | "hidden"
                | null
              // The tools the agent may call, null when all tools are enabled (including any the
              // server adds later), or "hidden" when the caller lacks edit access to the agent.
              enabled_tools:
                | Array<{ name: string; title: string | null }>
                | "hidden"
                | null
              // Whether read / write tool calls run without a confirmation step.
              run_tools_automatically: {
                // Whether read tool calls run without a confirmation step.
                read: boolean
                // Whether write tool calls run without a confirmation step.
                write: boolean
              }
            }
          | {
              // The connector's machine name (e.g. "github", "google_drive").
              type:
                | "asana"
                | "box"
                | "browser"
                | "calendar"
                | "computer"
                | "confluence"
                | "cursor"
                | "files"
                | "fs"
                | "github"
                | "gmail"
                | "google_calendar"
                | "google_drive"
                | "google_drive_oauth"
                | "gtm"
                | "helpdocs"
                | "images"
                | "jira"
                | "linear"
                | "mail"
                | "marketplace"
                | "memory"
                | "microsoft_teams"
                | "outlook"
                | "salesforce"
                | "search"
                | "security"
                | "sharepoint"
                | "skills"
                | "system"
                | "test"
                | "web"
                | "webhooks"
                | "worker"
                | "workers"
              name: string
              // The provider-side account identifier, null when none is linked, or "hidden" when the
              // caller lacks edit access to the agent.
              account: string | null
              permissions: Array<{
                target: { type: string; id: string }
                // The scopes granted on this target.
                scopes: Array<string>
              }>
            }
        >
        // "active" when the agent can run; "disabled" when it is paused (see pause_reason);
        // "deleted" when it has been removed.
        status: "active" | "disabled" | "deleted"
        // Why the agent is paused when status is "disabled" (e.g. "credit_limit",
        // "disabled_from_workspace_settings"); null when active.
        pause_reason:
          | "run_limit"
          | "credit_limit"
          | "runaway_credit_usage"
          | "workspace_credit_limit"
          | "failure_limit"
          | "mark_session_failed_autopause"
          | "disabled_from_workspace_settings"
          | "disabled_from_api"
          | "disabled_from_agent_settings"
          | "disabled_due_to_no_members_with_access"
          | "disabled_due_to_lack_of_editors"
          | "disabled_by_notion"
          | "internal_error"
          | "needs_user_review"
          | "tool_unavailable"
          | null
        created_by: {
          // One of: `user`, `bot`
          type: "user" | "bot"
          // The ID of the user or bot that created this agent.
          id: IdResponse
        } | null
        agent_version: {
          // The ID of the published artifact.
          id: IdResponse
          // The version number.
          number: number
          // The ISO 8601 timestamp when this version was published.
          published_at: string
        } | null
        // Date and time when this agent was created.
        created_time: string
        // Date and time when this agent was last edited.
        last_edited_time: string
        // ISO 8601 timestamp of the agent's most recent run, null if it has never run, or
        // "hidden" when the caller lacks edit access to the agent.
        last_run_at: string | "hidden" | null
        // The per-agent credit limit that applies to this agent, null when uncapped, or "hidden"
        // when the caller lacks full access to the agent. This is the effective limit computed
        // at runtime, folding in both the agent's own limit and any workspace-admin default.
        credit_limit: number | "hidden" | null
        // The agent's configured triggers, each with a machine type, an enabled flag, and a
        // structured recurrence schedule when applicable.
        triggers: Array<{
          // Machine trigger type (e.g. "notion.agent.mentioned", "recurrence",
          // "slack.reaction.added").
          type: string
          // Whether this trigger is currently enabled.
          enabled: boolean
          // Structured recurrence cadence. Present only for recurrence triggers.
          schedule?: {
            // Base cadence unit ("hour" | "day" | "week" | "month" | "year").
            frequency: string
            // Multiplier on the frequency (e.g. every 2 weeks).
            interval: number
            // Days of the week the schedule runs (e.g. "monday"). Present for weekly cadences and
            // monthly weekday restrictions.
            weekdays?: Array<string>
            // Days of the month the schedule runs. Present for monthly monthday restrictions.
            monthdays?: Array<number>
            // Week-of-month ordinals for a monthly weekday restriction (e.g. [2, 3] for the 2nd and
            // 3rd occurrence); -1 means the last week.
            week_numbers?: Array<number>
            // Hour of day (0–23) the schedule runs.
            hour?: number
            // Minute of the hour (0–59) the schedule runs.
            minute?: number
            // IANA timezone (e.g. "America/New_York").
            timezone?: string
            // ISO 8601 timestamp the schedule starts from.
            start_date?: string
            // When the schedule stops, when it is bounded.
            end?:
              | {
                  // Always `date`
                  type: "date"
                  // ISO 8601 timestamp when the schedule stops.
                  end_at: string
                }
              | {
                  // Always `count`
                  type: "count"
                  // Number of occurrences after which the schedule stops.
                  occurrences: number
                }
          }
          // Remaining per-type trigger configuration (e.g. watched channel ids, reaction config),
          // keys in snake_case. Present only when the trigger carries such state.
          config?: Record<string, Record<string, never>>
        }>
        // The agent's inline instructions when verbose=true, or null when its instructions are
        // stored on a page.
        instructions?: string | null
      }
    | {
        // Always `agent`
        object: "agent"
        // Always `33333333-3333-3333-3333-333333333333`
        id: "33333333-3333-3333-3333-333333333333"
        // Always `notion_ai`
        agent_type: "notion_ai"
        // Always `Notion Agent`
        name: "Notion Agent"
        description: null
        instructions_page_id: null
        icon:
          | PageIconResponse
          | {
              // Type of icon. In this case, a custom agent avatar.
              type: "custom_agent_avatar"
              // The static and animated URLs for the agent avatar.
              custom_agent_avatar: {
                // The URL of the static custom agent avatar.
                static_url: string
                // The URL of the animated custom agent avatar.
                animated_url: string
              }
            }
        model:
          | {
              // Always `auto`
              mode: "auto"
            }
          | {
              // Always `pinned`
              mode: "pinned"
              // The public model this agent maps to (e.g. "claude-sonnet-5"), or null for a
              // pre-release / early-access model.
              id: string | null
            }
        connections: Array<
          | {
              // Always `notion`
              type: "notion"
              name: string
              account: null
              permissions: Array<{
                target:
                  | {
                      // Always `page`
                      type: "page"
                      id: string
                    }
                  | {
                      // Always `database_property`
                      type: "database_property"
                      data_source_id: string
                      property_id: string
                    }
                  | {
                      // Always `agent`
                      type: "agent"
                      id: string
                    }
                  | {
                      // Always `workspace`
                      type: "workspace"
                    }
                  | {
                      // Always `owner_private_pages`
                      type: "owner_private_pages"
                    }
                  | {
                      // Always `web_search`
                      type: "web_search"
                      // Domains web search is restricted to, or null when unrestricted.
                      allowed_domains: Array<string> | null
                    }
                  | {
                      // Always `notion_help_docs_search`
                      type: "notion_help_docs_search"
                    }
                // Content roles ("reader" | "comment_only" | "read_and_write" | "editor") for scoped
                // targets, or search verbs ("allow" | "disallow") for the search targets.
                scopes: Array<string>
              }>
            }
          | {
              // Always `slack`
              type: "slack"
              name: string
              // The linked Slack workspace, null when none is linked, or "hidden" when the caller
              // lacks edit access to the agent.
              account:
                | {
                    // Always `slack_workspace`
                    type: "slack_workspace"
                    team_id: string
                  }
                | "hidden"
                | null
              permissions: Array<{
                target:
                  | {
                      // Always `slack_channel`
                      type: "slack_channel"
                      id: string
                    }
                  | {
                      // Always `slack_all_public_channels`
                      type: "slack_all_public_channels"
                    }
                  | {
                      // Always `slack_all_channels`
                      type: "slack_all_channels"
                    }
                // Slack verbs granted on this target ("read" | "write" | "reply_in_thread" | "react").
                scopes: Array<string>
              }>
            }
          | {
              // Always `discord`
              type: "discord"
              name: string
              // The linked Discord server, null when none is linked, or "hidden" when the caller lacks
              // edit access to the agent.
              account:
                | {
                    // Always `discord_server`
                    type: "discord_server"
                    id: string
                  }
                | "hidden"
                | null
              permissions: Array<{
                target:
                  | {
                      // Always `discord_channel`
                      type: "discord_channel"
                      id: string
                    }
                  | {
                      // Always `discord_all_channels`
                      type: "discord_all_channels"
                    }
                // Discord verbs granted on this target ("read" | "write" | "reply_in_thread" | "react").
                scopes: Array<string>
              }>
            }
          | {
              // Always `mcp_server`
              type: "mcp_server"
              name: string
              // The MCP server host, null when none is linked, or "hidden" when the caller lacks edit
              // access to the agent.
              account:
                | {
                    // Always `mcp_server`
                    type: "mcp_server"
                    // The MCP server host (never the full URL, which can carry credentials or private path
                    // components).
                    server_host: string
                  }
                | "hidden"
                | null
              // The tools the agent may call, null when all tools are enabled (including any the
              // server adds later), or "hidden" when the caller lacks edit access to the agent.
              enabled_tools:
                | Array<{ name: string; title: string | null }>
                | "hidden"
                | null
              // Whether read / write tool calls run without a confirmation step.
              run_tools_automatically: {
                // Whether read tool calls run without a confirmation step.
                read: boolean
                // Whether write tool calls run without a confirmation step.
                write: boolean
              }
            }
          | {
              // Always `custom_mcp_server`
              type: "custom_mcp_server"
              name: string
              // The MCP server host, null when none is linked, or "hidden" when the caller lacks edit
              // access to the agent.
              account:
                | {
                    // Always `mcp_server`
                    type: "mcp_server"
                    // The MCP server host (never the full URL, which can carry credentials or private path
                    // components).
                    server_host: string
                  }
                | "hidden"
                | null
              // The tools the agent may call, null when all tools are enabled (including any the
              // server adds later), or "hidden" when the caller lacks edit access to the agent.
              enabled_tools:
                | Array<{ name: string; title: string | null }>
                | "hidden"
                | null
              // Whether read / write tool calls run without a confirmation step.
              run_tools_automatically: {
                // Whether read tool calls run without a confirmation step.
                read: boolean
                // Whether write tool calls run without a confirmation step.
                write: boolean
              }
            }
          | {
              // The connector's machine name (e.g. "github", "google_drive").
              type:
                | "asana"
                | "box"
                | "browser"
                | "calendar"
                | "computer"
                | "confluence"
                | "cursor"
                | "files"
                | "fs"
                | "github"
                | "gmail"
                | "google_calendar"
                | "google_drive"
                | "google_drive_oauth"
                | "gtm"
                | "helpdocs"
                | "images"
                | "jira"
                | "linear"
                | "mail"
                | "marketplace"
                | "memory"
                | "microsoft_teams"
                | "outlook"
                | "salesforce"
                | "search"
                | "security"
                | "sharepoint"
                | "skills"
                | "system"
                | "test"
                | "web"
                | "webhooks"
                | "worker"
                | "workers"
              name: string
              // The provider-side account identifier, null when none is linked, or "hidden" when the
              // caller lacks edit access to the agent.
              account: string | null
              permissions: Array<{
                target: { type: string; id: string }
                // The scopes granted on this target.
                scopes: Array<string>
              }>
            }
        >
        // Always `active`
        status: "active"
        pause_reason: null
        created_by: null
        agent_version: null
        created_time: null
        last_edited_time: null
        last_run_at: null
        credit_limit: null
        triggers: Array<{
          // Machine trigger type (e.g. "notion.agent.mentioned", "recurrence",
          // "slack.reaction.added").
          type: string
          // Whether this trigger is currently enabled.
          enabled: boolean
          // Structured recurrence cadence. Present only for recurrence triggers.
          schedule?: {
            // Base cadence unit ("hour" | "day" | "week" | "month" | "year").
            frequency: string
            // Multiplier on the frequency (e.g. every 2 weeks).
            interval: number
            // Days of the week the schedule runs (e.g. "monday"). Present for weekly cadences and
            // monthly weekday restrictions.
            weekdays?: Array<string>
            // Days of the month the schedule runs. Present for monthly monthday restrictions.
            monthdays?: Array<number>
            // Week-of-month ordinals for a monthly weekday restriction (e.g. [2, 3] for the 2nd and
            // 3rd occurrence); -1 means the last week.
            week_numbers?: Array<number>
            // Hour of day (0–23) the schedule runs.
            hour?: number
            // Minute of the hour (0–59) the schedule runs.
            minute?: number
            // IANA timezone (e.g. "America/New_York").
            timezone?: string
            // ISO 8601 timestamp the schedule starts from.
            start_date?: string
            // When the schedule stops, when it is bounded.
            end?:
              | {
                  // Always `date`
                  type: "date"
                  // ISO 8601 timestamp when the schedule stops.
                  end_at: string
                }
              | {
                  // Always `count`
                  type: "count"
                  // Number of occurrences after which the schedule stops.
                  occurrences: number
                }
          }
          // Remaining per-type trigger configuration (e.g. watched channel ids, reaction config),
          // keys in snake_case. Present only when the trigger carries such state.
          config?: Record<string, Record<string, never>>
        }>
      }
  >
  has_more: boolean
  next_cursor: string | null
}

/**
 * Query agents
 */
export const queryAgents = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: [
    "query",
    "filter",
    "sorts",
    "start_cursor",
    "page_size",
    "verbose",
    "include_deleted",
  ],

  path: (): string => `agents/query`,
} as const

type QuerySessionEventsPathParameters = {
  // The ID of the session whose events should be queried.
  session_id: IdRequest
}

type QuerySessionEventsBodyParameters = {
  // A session event property filter, or an and/or compound filter nested up to three
  // levels deep.
  filter?:
    | { property: "id"; string: { equals: string } }
    | {
        property: "type"
        event_type: {
          equals?:
            | "user.message"
            | "agent.message"
            | "agent.thinking"
            | "agent.tool_use"
            | "agent.tool_result"
            | "session.status"
          in?: Array<
            | "user.message"
            | "agent.message"
            | "agent.thinking"
            | "agent.tool_use"
            | "agent.tool_result"
            | "session.status"
          >
        }
      }
    | {
        property: "sequence"
        number: {
          greater_than?: number
          greater_than_or_equal_to?: number
          less_than?: number
          less_than_or_equal_to?: number
        }
      }
    | {
        property: "created_at"
        timestamp: {
          equals?: string
          before?: string
          after?: string
          on_or_before?: string
          on_or_after?: string
        }
      }
    | {
        and: Array<
          | { property: "id"; string: { equals: string } }
          | {
              property: "type"
              event_type: {
                equals?:
                  | "user.message"
                  | "agent.message"
                  | "agent.thinking"
                  | "agent.tool_use"
                  | "agent.tool_result"
                  | "session.status"
                in?: Array<
                  | "user.message"
                  | "agent.message"
                  | "agent.thinking"
                  | "agent.tool_use"
                  | "agent.tool_result"
                  | "session.status"
                >
              }
            }
          | {
              property: "sequence"
              number: {
                greater_than?: number
                greater_than_or_equal_to?: number
                less_than?: number
                less_than_or_equal_to?: number
              }
            }
          | {
              property: "created_at"
              timestamp: {
                equals?: string
                before?: string
                after?: string
                on_or_before?: string
                on_or_after?: string
              }
            }
          | {
              and: Array<
                | { property: "id"; string: { equals: string } }
                | {
                    property: "type"
                    event_type: {
                      equals?:
                        | "user.message"
                        | "agent.message"
                        | "agent.thinking"
                        | "agent.tool_use"
                        | "agent.tool_result"
                        | "session.status"
                      in?: Array<
                        | "user.message"
                        | "agent.message"
                        | "agent.thinking"
                        | "agent.tool_use"
                        | "agent.tool_result"
                        | "session.status"
                      >
                    }
                  }
                | {
                    property: "sequence"
                    number: {
                      greater_than?: number
                      greater_than_or_equal_to?: number
                      less_than?: number
                      less_than_or_equal_to?: number
                    }
                  }
                | {
                    property: "created_at"
                    timestamp: {
                      equals?: string
                      before?: string
                      after?: string
                      on_or_before?: string
                      on_or_after?: string
                    }
                  }
                | {
                    and: Array<
                      | { property: "id"; string: { equals: string } }
                      | {
                          property: "type"
                          event_type: {
                            equals?:
                              | "user.message"
                              | "agent.message"
                              | "agent.thinking"
                              | "agent.tool_use"
                              | "agent.tool_result"
                              | "session.status"
                            in?: Array<
                              | "user.message"
                              | "agent.message"
                              | "agent.thinking"
                              | "agent.tool_use"
                              | "agent.tool_result"
                              | "session.status"
                            >
                          }
                        }
                      | {
                          property: "sequence"
                          number: {
                            greater_than?: number
                            greater_than_or_equal_to?: number
                            less_than?: number
                            less_than_or_equal_to?: number
                          }
                        }
                      | {
                          property: "created_at"
                          timestamp: {
                            equals?: string
                            before?: string
                            after?: string
                            on_or_before?: string
                            on_or_after?: string
                          }
                        }
                    >
                  }
                | {
                    or: Array<
                      | { property: "id"; string: { equals: string } }
                      | {
                          property: "type"
                          event_type: {
                            equals?:
                              | "user.message"
                              | "agent.message"
                              | "agent.thinking"
                              | "agent.tool_use"
                              | "agent.tool_result"
                              | "session.status"
                            in?: Array<
                              | "user.message"
                              | "agent.message"
                              | "agent.thinking"
                              | "agent.tool_use"
                              | "agent.tool_result"
                              | "session.status"
                            >
                          }
                        }
                      | {
                          property: "sequence"
                          number: {
                            greater_than?: number
                            greater_than_or_equal_to?: number
                            less_than?: number
                            less_than_or_equal_to?: number
                          }
                        }
                      | {
                          property: "created_at"
                          timestamp: {
                            equals?: string
                            before?: string
                            after?: string
                            on_or_before?: string
                            on_or_after?: string
                          }
                        }
                    >
                  }
              >
            }
          | {
              or: Array<
                | { property: "id"; string: { equals: string } }
                | {
                    property: "type"
                    event_type: {
                      equals?:
                        | "user.message"
                        | "agent.message"
                        | "agent.thinking"
                        | "agent.tool_use"
                        | "agent.tool_result"
                        | "session.status"
                      in?: Array<
                        | "user.message"
                        | "agent.message"
                        | "agent.thinking"
                        | "agent.tool_use"
                        | "agent.tool_result"
                        | "session.status"
                      >
                    }
                  }
                | {
                    property: "sequence"
                    number: {
                      greater_than?: number
                      greater_than_or_equal_to?: number
                      less_than?: number
                      less_than_or_equal_to?: number
                    }
                  }
                | {
                    property: "created_at"
                    timestamp: {
                      equals?: string
                      before?: string
                      after?: string
                      on_or_before?: string
                      on_or_after?: string
                    }
                  }
                | {
                    and: Array<
                      | { property: "id"; string: { equals: string } }
                      | {
                          property: "type"
                          event_type: {
                            equals?:
                              | "user.message"
                              | "agent.message"
                              | "agent.thinking"
                              | "agent.tool_use"
                              | "agent.tool_result"
                              | "session.status"
                            in?: Array<
                              | "user.message"
                              | "agent.message"
                              | "agent.thinking"
                              | "agent.tool_use"
                              | "agent.tool_result"
                              | "session.status"
                            >
                          }
                        }
                      | {
                          property: "sequence"
                          number: {
                            greater_than?: number
                            greater_than_or_equal_to?: number
                            less_than?: number
                            less_than_or_equal_to?: number
                          }
                        }
                      | {
                          property: "created_at"
                          timestamp: {
                            equals?: string
                            before?: string
                            after?: string
                            on_or_before?: string
                            on_or_after?: string
                          }
                        }
                    >
                  }
                | {
                    or: Array<
                      | { property: "id"; string: { equals: string } }
                      | {
                          property: "type"
                          event_type: {
                            equals?:
                              | "user.message"
                              | "agent.message"
                              | "agent.thinking"
                              | "agent.tool_use"
                              | "agent.tool_result"
                              | "session.status"
                            in?: Array<
                              | "user.message"
                              | "agent.message"
                              | "agent.thinking"
                              | "agent.tool_use"
                              | "agent.tool_result"
                              | "session.status"
                            >
                          }
                        }
                      | {
                          property: "sequence"
                          number: {
                            greater_than?: number
                            greater_than_or_equal_to?: number
                            less_than?: number
                            less_than_or_equal_to?: number
                          }
                        }
                      | {
                          property: "created_at"
                          timestamp: {
                            equals?: string
                            before?: string
                            after?: string
                            on_or_before?: string
                            on_or_after?: string
                          }
                        }
                    >
                  }
              >
            }
        >
      }
    | {
        or: Array<
          | { property: "id"; string: { equals: string } }
          | {
              property: "type"
              event_type: {
                equals?:
                  | "user.message"
                  | "agent.message"
                  | "agent.thinking"
                  | "agent.tool_use"
                  | "agent.tool_result"
                  | "session.status"
                in?: Array<
                  | "user.message"
                  | "agent.message"
                  | "agent.thinking"
                  | "agent.tool_use"
                  | "agent.tool_result"
                  | "session.status"
                >
              }
            }
          | {
              property: "sequence"
              number: {
                greater_than?: number
                greater_than_or_equal_to?: number
                less_than?: number
                less_than_or_equal_to?: number
              }
            }
          | {
              property: "created_at"
              timestamp: {
                equals?: string
                before?: string
                after?: string
                on_or_before?: string
                on_or_after?: string
              }
            }
          | {
              and: Array<
                | { property: "id"; string: { equals: string } }
                | {
                    property: "type"
                    event_type: {
                      equals?:
                        | "user.message"
                        | "agent.message"
                        | "agent.thinking"
                        | "agent.tool_use"
                        | "agent.tool_result"
                        | "session.status"
                      in?: Array<
                        | "user.message"
                        | "agent.message"
                        | "agent.thinking"
                        | "agent.tool_use"
                        | "agent.tool_result"
                        | "session.status"
                      >
                    }
                  }
                | {
                    property: "sequence"
                    number: {
                      greater_than?: number
                      greater_than_or_equal_to?: number
                      less_than?: number
                      less_than_or_equal_to?: number
                    }
                  }
                | {
                    property: "created_at"
                    timestamp: {
                      equals?: string
                      before?: string
                      after?: string
                      on_or_before?: string
                      on_or_after?: string
                    }
                  }
                | {
                    and: Array<
                      | { property: "id"; string: { equals: string } }
                      | {
                          property: "type"
                          event_type: {
                            equals?:
                              | "user.message"
                              | "agent.message"
                              | "agent.thinking"
                              | "agent.tool_use"
                              | "agent.tool_result"
                              | "session.status"
                            in?: Array<
                              | "user.message"
                              | "agent.message"
                              | "agent.thinking"
                              | "agent.tool_use"
                              | "agent.tool_result"
                              | "session.status"
                            >
                          }
                        }
                      | {
                          property: "sequence"
                          number: {
                            greater_than?: number
                            greater_than_or_equal_to?: number
                            less_than?: number
                            less_than_or_equal_to?: number
                          }
                        }
                      | {
                          property: "created_at"
                          timestamp: {
                            equals?: string
                            before?: string
                            after?: string
                            on_or_before?: string
                            on_or_after?: string
                          }
                        }
                    >
                  }
                | {
                    or: Array<
                      | { property: "id"; string: { equals: string } }
                      | {
                          property: "type"
                          event_type: {
                            equals?:
                              | "user.message"
                              | "agent.message"
                              | "agent.thinking"
                              | "agent.tool_use"
                              | "agent.tool_result"
                              | "session.status"
                            in?: Array<
                              | "user.message"
                              | "agent.message"
                              | "agent.thinking"
                              | "agent.tool_use"
                              | "agent.tool_result"
                              | "session.status"
                            >
                          }
                        }
                      | {
                          property: "sequence"
                          number: {
                            greater_than?: number
                            greater_than_or_equal_to?: number
                            less_than?: number
                            less_than_or_equal_to?: number
                          }
                        }
                      | {
                          property: "created_at"
                          timestamp: {
                            equals?: string
                            before?: string
                            after?: string
                            on_or_before?: string
                            on_or_after?: string
                          }
                        }
                    >
                  }
              >
            }
          | {
              or: Array<
                | { property: "id"; string: { equals: string } }
                | {
                    property: "type"
                    event_type: {
                      equals?:
                        | "user.message"
                        | "agent.message"
                        | "agent.thinking"
                        | "agent.tool_use"
                        | "agent.tool_result"
                        | "session.status"
                      in?: Array<
                        | "user.message"
                        | "agent.message"
                        | "agent.thinking"
                        | "agent.tool_use"
                        | "agent.tool_result"
                        | "session.status"
                      >
                    }
                  }
                | {
                    property: "sequence"
                    number: {
                      greater_than?: number
                      greater_than_or_equal_to?: number
                      less_than?: number
                      less_than_or_equal_to?: number
                    }
                  }
                | {
                    property: "created_at"
                    timestamp: {
                      equals?: string
                      before?: string
                      after?: string
                      on_or_before?: string
                      on_or_after?: string
                    }
                  }
                | {
                    and: Array<
                      | { property: "id"; string: { equals: string } }
                      | {
                          property: "type"
                          event_type: {
                            equals?:
                              | "user.message"
                              | "agent.message"
                              | "agent.thinking"
                              | "agent.tool_use"
                              | "agent.tool_result"
                              | "session.status"
                            in?: Array<
                              | "user.message"
                              | "agent.message"
                              | "agent.thinking"
                              | "agent.tool_use"
                              | "agent.tool_result"
                              | "session.status"
                            >
                          }
                        }
                      | {
                          property: "sequence"
                          number: {
                            greater_than?: number
                            greater_than_or_equal_to?: number
                            less_than?: number
                            less_than_or_equal_to?: number
                          }
                        }
                      | {
                          property: "created_at"
                          timestamp: {
                            equals?: string
                            before?: string
                            after?: string
                            on_or_before?: string
                            on_or_after?: string
                          }
                        }
                    >
                  }
                | {
                    or: Array<
                      | { property: "id"; string: { equals: string } }
                      | {
                          property: "type"
                          event_type: {
                            equals?:
                              | "user.message"
                              | "agent.message"
                              | "agent.thinking"
                              | "agent.tool_use"
                              | "agent.tool_result"
                              | "session.status"
                            in?: Array<
                              | "user.message"
                              | "agent.message"
                              | "agent.thinking"
                              | "agent.tool_use"
                              | "agent.tool_result"
                              | "session.status"
                            >
                          }
                        }
                      | {
                          property: "sequence"
                          number: {
                            greater_than?: number
                            greater_than_or_equal_to?: number
                            less_than?: number
                            less_than_or_equal_to?: number
                          }
                        }
                      | {
                          property: "created_at"
                          timestamp: {
                            equals?: string
                            before?: string
                            after?: string
                            on_or_before?: string
                            on_or_after?: string
                          }
                        }
                    >
                  }
              >
            }
        >
      }
  // Ordered sort precedence. Defaults to sequence ascending.
  sorts?: Array<{
    // One of: `sequence`, `created_at`
    property: "sequence" | "created_at"
    // One of: `ascending`, `descending`
    direction: "ascending" | "descending"
  }>
  // The continuation cursor returned by the previous page.
  start_cursor?: string | null
  // The number of events to return. Maximum: 100.
  page_size?: number
}

export type QuerySessionEventsParameters = QuerySessionEventsPathParameters &
  QuerySessionEventsBodyParameters

export type QuerySessionEventsResponse = {
  // Always `list`
  object: "list"
  // Always `session_event`
  type: "session_event"
  session_event: Record<string, never>
  results: Array<
    | {
        // Always `session_event`
        object: "session_event"
        id: string
        session_id: string
        sequence: number
        created_at: string
        // Always `user.message`
        type: "user.message"
        content: Array<
          | {
              // Always `text`
              type: "text"
              text: string
            }
          | {
              // Always `file`
              type: "file"
              name: string
              content_type: string
              url: string
              expiry_time?: string
            }
        >
        created_by: {
          id: string
          // One of: `user`, `bot`
          type: "user" | "bot"
        } | null
        metadata: Record<string, string> | null
      }
    | {
        // Always `session_event`
        object: "session_event"
        id: string
        session_id: string
        sequence: number
        created_at: string
        // Always `agent.message`
        type: "agent.message"
        content: Array<
          | {
              // Always `text`
              type: "text"
              text: string
            }
          | {
              // Always `file`
              type: "file"
              name: string
              content_type: string
              url: string
              expiry_time?: string
            }
        >
        created_by: {
          id: string
          // One of: `user`, `bot`
          type: "user" | "bot"
        } | null
        metadata: { model: string } | null
      }
    | {
        // Always `session_event`
        object: "session_event"
        id: string
        session_id: string
        sequence: number
        created_at: string
        // Always `agent.thinking`
        type: "agent.thinking"
        content: Array<{
          // Always `text`
          type: "text"
          text: string
        }>
      }
    | {
        // Always `session_event`
        object: "session_event"
        id: string
        session_id: string
        sequence: number
        created_at: string
        // Always `agent.tool_use`
        type: "agent.tool_use"
        tool_name: string
      }
    | {
        // Always `session_event`
        object: "session_event"
        id: string
        session_id: string
        sequence: number
        created_at: string
        // Always `agent.tool_result`
        type: "agent.tool_result"
        tool_use_id: string
        tool_name: string
        is_error: boolean
      }
    | {
        // Always `session_event`
        object: "session_event"
        id: string
        session_id: string
        sequence: number
        created_at: string
        // Always `session.status`
        type: "session.status"
        // One of: `requires_action`, `completed`, `failed`, `canceled`, `terminated`
        status:
          | "requires_action"
          | "completed"
          | "failed"
          | "canceled"
          | "terminated"
        required_actions?: Array<{
          action_id: string
          title: string
          options: Array<{
            // One of: `approve`, `reject`
            id: "approve" | "reject"
            label: string
          }>
        }>
        error?: { code: string; message: string; retryable: boolean }
      }
  >
  has_more: boolean
  next_cursor: string | null
}

/**
 * Query session events
 */
export const querySessionEvents = {
  method: "post",
  pathParams: ["session_id"],
  queryParams: [],
  bodyParams: ["filter", "sorts", "start_cursor", "page_size"],

  path: (p: QuerySessionEventsPathParameters): string =>
    `sessions/${p.session_id}/events/query`,
} as const

type QuerySessionsBodyParameters = {
  // A case-insensitive substring search over session titles.
  query?: string
  // A session property filter, or an and/or compound filter nested up to two levels deep.
  filter?:
    | {
        property: "id"
        // An exact string comparison.
        string: {
          // Return sessions with this exact value.
          equals: string
        }
      }
    | {
        property: "agent_id"
        // An exact string comparison.
        string: {
          // Return sessions with this exact value.
          equals: string
        }
      }
    | {
        property: "status"
        // A session status comparison.
        status: {
          // Return sessions with this status.
          equals?:
            | "queued"
            | "in_progress"
            | "requires_action"
            | "completed"
            | "failed"
            | "canceled"
            | "terminated"
          // Return sessions with any of these statuses.
          in?: Array<
            | "queued"
            | "in_progress"
            | "requires_action"
            | "completed"
            | "failed"
            | "canceled"
            | "terminated"
          >
        }
      }
    | {
        // The session timestamp to compare.
        property: "created_at" | "updated_at"
        // A timestamp range.
        timestamp: {
          // Return sessions before this time.
          before?: string
          // Return sessions after this time.
          after?: string
          // Return sessions at or before this time.
          on_or_before?: string
          // Return sessions at or after this time.
          on_or_after?: string
        }
      }
    | {
        // Return sessions that match every child filter.
        and: Array<
          | {
              property: "id"
              // An exact string comparison.
              string: {
                // Return sessions with this exact value.
                equals: string
              }
            }
          | {
              property: "agent_id"
              // An exact string comparison.
              string: {
                // Return sessions with this exact value.
                equals: string
              }
            }
          | {
              property: "status"
              // A session status comparison.
              status: {
                // Return sessions with this status.
                equals?:
                  | "queued"
                  | "in_progress"
                  | "requires_action"
                  | "completed"
                  | "failed"
                  | "canceled"
                  | "terminated"
                // Return sessions with any of these statuses.
                in?: Array<
                  | "queued"
                  | "in_progress"
                  | "requires_action"
                  | "completed"
                  | "failed"
                  | "canceled"
                  | "terminated"
                >
              }
            }
          | {
              // The session timestamp to compare.
              property: "created_at" | "updated_at"
              // A timestamp range.
              timestamp: {
                // Return sessions before this time.
                before?: string
                // Return sessions after this time.
                after?: string
                // Return sessions at or before this time.
                on_or_before?: string
                // Return sessions at or after this time.
                on_or_after?: string
              }
            }
          | {
              // Return sessions that match every child filter.
              and: Array<
                | {
                    property: "id"
                    // An exact string comparison.
                    string: {
                      // Return sessions with this exact value.
                      equals: string
                    }
                  }
                | {
                    property: "agent_id"
                    // An exact string comparison.
                    string: {
                      // Return sessions with this exact value.
                      equals: string
                    }
                  }
                | {
                    property: "status"
                    // A session status comparison.
                    status: {
                      // Return sessions with this status.
                      equals?:
                        | "queued"
                        | "in_progress"
                        | "requires_action"
                        | "completed"
                        | "failed"
                        | "canceled"
                        | "terminated"
                      // Return sessions with any of these statuses.
                      in?: Array<
                        | "queued"
                        | "in_progress"
                        | "requires_action"
                        | "completed"
                        | "failed"
                        | "canceled"
                        | "terminated"
                      >
                    }
                  }
                | {
                    // The session timestamp to compare.
                    property: "created_at" | "updated_at"
                    // A timestamp range.
                    timestamp: {
                      // Return sessions before this time.
                      before?: string
                      // Return sessions after this time.
                      after?: string
                      // Return sessions at or before this time.
                      on_or_before?: string
                      // Return sessions at or after this time.
                      on_or_after?: string
                    }
                  }
              >
            }
          | {
              // Return sessions that match any child filter.
              or: Array<
                | {
                    property: "id"
                    // An exact string comparison.
                    string: {
                      // Return sessions with this exact value.
                      equals: string
                    }
                  }
                | {
                    property: "agent_id"
                    // An exact string comparison.
                    string: {
                      // Return sessions with this exact value.
                      equals: string
                    }
                  }
                | {
                    property: "status"
                    // A session status comparison.
                    status: {
                      // Return sessions with this status.
                      equals?:
                        | "queued"
                        | "in_progress"
                        | "requires_action"
                        | "completed"
                        | "failed"
                        | "canceled"
                        | "terminated"
                      // Return sessions with any of these statuses.
                      in?: Array<
                        | "queued"
                        | "in_progress"
                        | "requires_action"
                        | "completed"
                        | "failed"
                        | "canceled"
                        | "terminated"
                      >
                    }
                  }
                | {
                    // The session timestamp to compare.
                    property: "created_at" | "updated_at"
                    // A timestamp range.
                    timestamp: {
                      // Return sessions before this time.
                      before?: string
                      // Return sessions after this time.
                      after?: string
                      // Return sessions at or before this time.
                      on_or_before?: string
                      // Return sessions at or after this time.
                      on_or_after?: string
                    }
                  }
              >
            }
        >
      }
    | {
        // Return sessions that match any child filter.
        or: Array<
          | {
              property: "id"
              // An exact string comparison.
              string: {
                // Return sessions with this exact value.
                equals: string
              }
            }
          | {
              property: "agent_id"
              // An exact string comparison.
              string: {
                // Return sessions with this exact value.
                equals: string
              }
            }
          | {
              property: "status"
              // A session status comparison.
              status: {
                // Return sessions with this status.
                equals?:
                  | "queued"
                  | "in_progress"
                  | "requires_action"
                  | "completed"
                  | "failed"
                  | "canceled"
                  | "terminated"
                // Return sessions with any of these statuses.
                in?: Array<
                  | "queued"
                  | "in_progress"
                  | "requires_action"
                  | "completed"
                  | "failed"
                  | "canceled"
                  | "terminated"
                >
              }
            }
          | {
              // The session timestamp to compare.
              property: "created_at" | "updated_at"
              // A timestamp range.
              timestamp: {
                // Return sessions before this time.
                before?: string
                // Return sessions after this time.
                after?: string
                // Return sessions at or before this time.
                on_or_before?: string
                // Return sessions at or after this time.
                on_or_after?: string
              }
            }
          | {
              // Return sessions that match every child filter.
              and: Array<
                | {
                    property: "id"
                    // An exact string comparison.
                    string: {
                      // Return sessions with this exact value.
                      equals: string
                    }
                  }
                | {
                    property: "agent_id"
                    // An exact string comparison.
                    string: {
                      // Return sessions with this exact value.
                      equals: string
                    }
                  }
                | {
                    property: "status"
                    // A session status comparison.
                    status: {
                      // Return sessions with this status.
                      equals?:
                        | "queued"
                        | "in_progress"
                        | "requires_action"
                        | "completed"
                        | "failed"
                        | "canceled"
                        | "terminated"
                      // Return sessions with any of these statuses.
                      in?: Array<
                        | "queued"
                        | "in_progress"
                        | "requires_action"
                        | "completed"
                        | "failed"
                        | "canceled"
                        | "terminated"
                      >
                    }
                  }
                | {
                    // The session timestamp to compare.
                    property: "created_at" | "updated_at"
                    // A timestamp range.
                    timestamp: {
                      // Return sessions before this time.
                      before?: string
                      // Return sessions after this time.
                      after?: string
                      // Return sessions at or before this time.
                      on_or_before?: string
                      // Return sessions at or after this time.
                      on_or_after?: string
                    }
                  }
              >
            }
          | {
              // Return sessions that match any child filter.
              or: Array<
                | {
                    property: "id"
                    // An exact string comparison.
                    string: {
                      // Return sessions with this exact value.
                      equals: string
                    }
                  }
                | {
                    property: "agent_id"
                    // An exact string comparison.
                    string: {
                      // Return sessions with this exact value.
                      equals: string
                    }
                  }
                | {
                    property: "status"
                    // A session status comparison.
                    status: {
                      // Return sessions with this status.
                      equals?:
                        | "queued"
                        | "in_progress"
                        | "requires_action"
                        | "completed"
                        | "failed"
                        | "canceled"
                        | "terminated"
                      // Return sessions with any of these statuses.
                      in?: Array<
                        | "queued"
                        | "in_progress"
                        | "requires_action"
                        | "completed"
                        | "failed"
                        | "canceled"
                        | "terminated"
                      >
                    }
                  }
                | {
                    // The session timestamp to compare.
                    property: "created_at" | "updated_at"
                    // A timestamp range.
                    timestamp: {
                      // Return sessions before this time.
                      before?: string
                      // Return sessions after this time.
                      after?: string
                      // Return sessions at or before this time.
                      on_or_before?: string
                      // Return sessions at or after this time.
                      on_or_after?: string
                    }
                  }
              >
            }
        >
      }
  // Ordered sort precedence. Defaults to updated_at descending.
  sorts?: Array<{
    // One of: `created_at`, `updated_at`
    property: "created_at" | "updated_at"
    // One of: `ascending`, `descending`
    direction: "ascending" | "descending"
  }>
  // The continuation cursor returned by the previous page.
  start_cursor?: string | null
  // The number of sessions to return. Maximum: 100.
  page_size?: number
}

export type QuerySessionsParameters = QuerySessionsBodyParameters

export type QuerySessionsResponse = {
  // Always `list`
  object: "list"
  // Always `session`
  type: "session"
  session: Record<string, never>
  results: Array<{
    // Always `session`
    object: "session"
    id: string
    agent_id: string
    title: string
    // One of: `queued`, `in_progress`, `requires_action`, `completed`, `failed`, `canceled`,
    // `terminated`
    status:
      | "queued"
      | "in_progress"
      | "requires_action"
      | "completed"
      | "failed"
      | "canceled"
      | "terminated"
    created_by: {
      id: string
      // One of: `user`, `bot`
      type: "user" | "bot"
    }
    agent_version: { id: string; number: number; published_at: string } | null
    models:
      | {
          // Always `auto`
          type: "auto"
        }
      | {
          // Always `pinned`
          type: "pinned"
          ids: Array<string | null>
        }
    created_at: string
    updated_at: string
    required_actions?: Array<{
      action_id: string
      title: string
      options: Array<{
        // One of: `approve`, `reject`
        id: "approve" | "reject"
        label: string
      }>
    }>
    error?: { code: string; message: string; retryable: boolean }
    trigger_type?: string
    type_labels?: Array<string> | null
    chat_user_emails?: Array<string> | null
    tool_types?: Array<string> | null
    tool_call_count?: number | null
    credits_used?: number | null
    runs_completed?: number | null
    message_count?: number | null
  }>
  has_more: boolean
  next_cursor: string | null
}

/**
 * Query sessions
 */
export const querySessions = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: ["query", "filter", "sorts", "start_cursor", "page_size"],

  path: (): string => `sessions/query`,
} as const

type QueryThreadMessagesPathParameters = {
  // The ID of the thread.
  thread_id: IdRequest
}

type QueryThreadMessagesBodyParameters = {
  // Whether to include thinking, raw tool names, tool calls, and tool results. Defaults to
  // false.
  verbose?: boolean
  // Opaque continuation cursor from the previous page.
  start_cursor?: string | null
  // Number of messages to return. Maximum: 100.
  page_size?: number
}

export type QueryThreadMessagesParameters = QueryThreadMessagesPathParameters &
  QueryThreadMessagesBodyParameters

export type QueryThreadMessagesResponse = {
  // Always `list`
  object: "list"
  // Always `thread_message`
  type: "thread_message"
  results: Array<{
    // Always `thread_message`
    object: "thread_message"
    id: IdResponse
    // One of: `user`, `agent`
    role: "user" | "agent"
    content: string
    // Date and time when this message was created.
    created_time: string
    parent: {
      // The parent type.
      type: "thread"
      // The ID of the parent thread.
      id: IdResponse
    }
    attachments?: Array<{
      name: string
      content_type: string
      url: string
      // The time when the attachment URL will expire.
      expiry_time?: string
    }>
    content_parts?: Array<
      | {
          // Always `text`
          type: "text"
          text: string
        }
      | {
          // Always `thinking`
          type: "thinking"
          text: string
        }
      | {
          // Always `tool_call`
          type: "tool_call"
          tool_call_id: string | null
          tool_name: string
          input: string
          results?: Array<{
            id: IdResponse
            agent_step_id: IdResponse | null
            tool_call_id: string | null
            tool_name: string
            tool_type: string
            state: string
            input: Record<string, never> | null
            output: Record<string, never> | null
            error: string | null
            started_at: number
            finished_at: number | null
            duration_ms: number | null
          }>
        }
      | {
          // Always `follow_ups`
          type: "follow_ups"
          follow_ups: Array<{ label: string; message: string }>
        }
      | {
          // Always `custom_agent_template_picker`
          type: "custom_agent_template_picker"
        }
    >
    pending_user_actions?: Array<{
      id: IdResponse
      // Always `tool_confirmation`
      type: "tool_confirmation"
      title: string
      requirements: Array<
        | {
            // Always `general`
            type: "general"
          }
        | {
            // Always `manage_workers`
            type: "manage_workers"
          }
        | {
            // Always `url_safety`
            type: "url_safety"
            urls: Array<string>
            required_by_workspace_policy?: boolean
          }
        | {
            // Always `permission_escalation`
            type: "permission_escalation"
            destination_title?: string
            source_titles?: Array<string>
          }
        | {
            // Always `delete_content`
            type: "delete_content"
            page_count: number
            database_count: number
            meeting_notes_block_count?: number
          }
        | {
            // Always `connect_integration`
            type: "connect_integration"
            integration_type: string
            integration_name: string
            handoff_url: string
          }
        | {
            // Always `admin_mode`
            type: "admin_mode"
            explanation?: string
          }
      >
      options: Array<
        | {
            // Always `approve`
            id: "approve"
            label: string
          }
        | {
            // Always `reject`
            id: "reject"
            label: string
          }
        | {
            // Always `use_connection`
            id: "use_connection"
            label: string
            input: {
              // Always `connection_id`
              type: "connection_id"
              // Always `true`
              required: true
            }
          }
      >
    }>
  }>
  has_more: boolean
  next_cursor: string | null
}

/**
 * Query thread messages
 */
export const queryThreadMessages = {
  method: "post",
  pathParams: ["thread_id"],
  queryParams: [],
  bodyParams: ["verbose", "start_cursor", "page_size"],

  path: (p: QueryThreadMessagesPathParameters): string =>
    `threads/${p.thread_id}/messages/query`,
} as const

type QueryThreadsPathParameters = {
  // The ID of the agent. Use a UUID for custom agents or `notion_ai` for Notion Agent
  // (personal agent); the reserved UUID `33333333-3333-3333-3333-333333333333` remains
  // supported for backward compatibility.
  agent_id: IdRequest | "notion_ai" | "33333333-3333-3333-3333-333333333333"
}

type QueryThreadsBodyParameters = {
  // Search thread titles.
  query?: string
  // Thread filters.
  filter?: {
    // Filter threads by ID (exact match).
    id?: IdRequest
    // Filter by one or more activity statuses. `all` cannot be combined with another status.
    status?: Array<"all" | "pending" | "in_progress" | "failed" | "success">
    // Filter by creator IDs or "me".
    created_by?: Array<IdRequest | "me">
    // Filter by last-used actor IDs or "me".
    last_used_by?: Array<IdRequest | "me">
    // Filter to threads containing a public-facing message in the requested time window.
    message_time?: {
      // Inclusive start of the message time window. Defaults to the Unix epoch.
      start?: string
      // Exclusive end of the message time window. Defaults to the current time.
      end?: string
    }
  }
  // Ordered sort precedence. Defaults to last_used_time descending.
  sorts?: Array<{
    // Timestamp used to sort threads.
    timestamp: "created_time" | "last_used_time"
    // Sort direction.
    direction: "ascending" | "descending"
  }>
  // Opaque continuation cursor from the previous page.
  start_cursor?: string | null
  // Number of threads to return. Maximum: 100.
  page_size?: number
}

export type QueryThreadsParameters = QueryThreadsPathParameters &
  QueryThreadsBodyParameters

export type QueryThreadsResponse = {
  // Always `list`
  object: "list"
  // Always `thread`
  type: "thread"
  results: Array<{
    // Always `thread`
    object: "thread"
    id: IdResponse
    title: string
    // One of: `pending`, `requires_action`, `completed`, `failed`
    status: "pending" | "requires_action" | "completed" | "failed"
    // Date and time when this thread was created.
    created_time: string
    // Date and time when this thread was last updated.
    last_edited_time: string
    created_by: {
      // The ID of the actor that created this thread: a bot for an integration-created thread,
      // a user for one created in the Notion app.
      id: IdResponse
      // The creator type. Threads a caller can see because it has access to the agent, such as
      // a trigger's runs or a teammate's chats, may be created by either a bot or a user.
      type: "bot" | "user"
    }
    agent_version: {
      // The ID of the published artifact.
      id: IdResponse
      // The version number.
      number: number
      // The ISO 8601 timestamp when this version was published.
      published_at: string
    } | null
    models:
      | {
          // Always `auto`
          type: "auto"
        }
      | {
          // Always `pinned`
          type: "pinned"
          // The public model this thread is pinned to (e.g. "claude-sonnet-5"), with null for a
          // pre-release / early-access model. Empty when the thread has no model recorded yet.
          // Reflects the thread's configuration at creation, so a model changed mid-conversation
          // is not reflected here.
          ids: Array<string | null>
        }
    error?: string
    // How this thread started: the type of the trigger that ran it, or "chat".
    trigger_type?: string
    // Labels describing how the thread ran (triggered, chat, setup). Null when the caller
    // lacks edit access to the agent.
    type_labels?: Array<string> | null
    // Emails of the users who participated in this thread. Null when the caller lacks edit
    // access to the agent.
    chat_user_emails?: Array<string> | null
    // Types of tool this thread called. Null when the caller lacks edit access to the agent.
    tool_types?: Array<string> | null
    // Number of tool calls in this thread. Null when the caller lacks edit access to the
    // agent.
    tool_call_count?: number | null
    // Premium AI credits this thread consumed. Null when the caller lacks edit access to the
    // agent.
    credits_used?: number | null
    // Runs completed in this thread. Null when the caller lacks edit access to the agent, or
    // when the thread predates run tracking.
    runs_completed?: number | null
    pending_user_actions?: Array<{
      id: IdResponse
      // Always `tool_confirmation`
      type: "tool_confirmation"
      title: string
      requirements: Array<
        | {
            // Always `general`
            type: "general"
          }
        | {
            // Always `manage_workers`
            type: "manage_workers"
          }
        | {
            // Always `url_safety`
            type: "url_safety"
            urls: Array<string>
            required_by_workspace_policy?: boolean
          }
        | {
            // Always `permission_escalation`
            type: "permission_escalation"
            destination_title?: string
            source_titles?: Array<string>
          }
        | {
            // Always `delete_content`
            type: "delete_content"
            page_count: number
            database_count: number
            meeting_notes_block_count?: number
          }
        | {
            // Always `connect_integration`
            type: "connect_integration"
            integration_type: string
            integration_name: string
            handoff_url: string
          }
        | {
            // Always `admin_mode`
            type: "admin_mode"
            explanation?: string
          }
      >
      options: Array<
        | {
            // Always `approve`
            id: "approve"
            label: string
          }
        | {
            // Always `reject`
            id: "reject"
            label: string
          }
        | {
            // Always `use_connection`
            id: "use_connection"
            label: string
            input: {
              // Always `connection_id`
              type: "connection_id"
              // Always `true`
              required: true
            }
          }
      >
    }>
  }>
  has_more: boolean
  next_cursor: string | null
}

/**
 * Query threads
 */
export const queryThreads = {
  method: "post",
  pathParams: ["agent_id"],
  queryParams: [],
  bodyParams: ["query", "filter", "sorts", "start_cursor", "page_size"],

  path: (p: QueryThreadsPathParameters): string =>
    `agents/${p.agent_id}/threads/query`,
} as const

type RetrieveSessionPathParameters = {
  // The ID of the session to retrieve.
  session_id: IdRequest
}

export type RetrieveSessionParameters = RetrieveSessionPathParameters

export type RetrieveSessionResponse = {
  // Always `session`
  object: "session"
  id: string
  agent_id: string
  title: string
  // One of: `queued`, `in_progress`, `requires_action`, `completed`, `failed`, `canceled`,
  // `terminated`
  status:
    | "queued"
    | "in_progress"
    | "requires_action"
    | "completed"
    | "failed"
    | "canceled"
    | "terminated"
  created_at: string
  updated_at: string
  created_by: {
    id: string
    // One of: `user`, `bot`
    type: "user" | "bot"
  }
  agent_version: { id: string; number: number; published_at: string } | null
  models:
    | {
        // Always `auto`
        type: "auto"
      }
    | {
        // Always `pinned`
        type: "pinned"
        ids: Array<string | null>
      }
  required_actions?: Array<{
    action_id: string
    title: string
    options: Array<{
      // One of: `approve`, `reject`
      id: "approve" | "reject"
      label: string
    }>
  }>
  error?: { code: string; message: string; retryable: boolean }
  trigger_type?: string
  type_labels?: Array<string> | null
  chat_user_emails?: Array<string> | null
  tool_types?: Array<string> | null
  tool_call_count?: number | null
  credits_used?: number | null
  runs_completed?: number | null
  message_count?: number | null
}

/**
 * Retrieve a session
 */
export const retrieveSession = {
  method: "get",
  pathParams: ["session_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: RetrieveSessionPathParameters): string =>
    `sessions/${p.session_id}`,
} as const

type SendExternalAgentStubSessionMessagePathParameters = {
  // The ID of the agent backing this external agent session.
  agent_id: IdRequest | "33333333-3333-3333-3333-333333333333"
  // The provider-owned session ID returned when the session was created.
  session_id: IdRequest
}

type SendExternalAgentStubSessionMessageBodyParameters = {
  // Text message to send to the agent.
  message: string
  // Idempotency key for this message submission. Accepted but not yet used for
  // deduplication by the stub.
  client_message_id?: string
}

export type SendExternalAgentStubSessionMessageParameters =
  SendExternalAgentStubSessionMessagePathParameters &
    SendExternalAgentStubSessionMessageBodyParameters

export type SendExternalAgentStubSessionMessageResponse = {
  accepted: boolean
  run_id?: string
}

/**
 * Send external agent stub session message
 */
export const sendExternalAgentStubSessionMessage = {
  method: "post",
  pathParams: ["agent_id", "session_id"],
  queryParams: [],
  bodyParams: ["message", "client_message_id"],

  path: (p: SendExternalAgentStubSessionMessagePathParameters): string =>
    `external_agent_stub/${p.agent_id}/sessions/${p.session_id}/messages`,
} as const

type StartExternalAgentStubSessionPathParameters = {
  // The ID of the agent backing this external agent session.
  agent_id: IdRequest | "33333333-3333-3333-3333-333333333333"
}

type StartExternalAgentStubSessionBodyParameters = {
  // External Agent API wire version.
  spec_version?: "v1"
  // Idempotency key for one session-creation intent.
  client_reference_id?: string
  // Vault-backed session configuration.
  configs?: {
    // The ordered MCP server configuration.
    mcp_servers: Array<{
      // MCP server name.
      name: string
      // MCP server URL.
      server_url: string
      // Credential vault reference or deliberate no-auth.
      credential:
        | {
            // Vault-backed credential reference.
            type: "vault"
            // Provider-owned vault ID.
            vault_id: string
          }
        | {
            // No authorization credential.
            type: "none"
          }
    }>
  }
  // Preferred model hint. The stub echoes it back and may ignore it.
  model?: string
  // Working directory hint. Not applicable to this provider; echoed back.
  cwd?: string
  // BCP 47 locale identifier such as `en-US`.
  locale?: string
  // Session-scoped instructions for the external agent.
  system_prompt?: string
}

export type StartExternalAgentStubSessionParameters =
  StartExternalAgentStubSessionPathParameters &
    StartExternalAgentStubSessionBodyParameters

export type StartExternalAgentStubSessionResponse = {
  session_id: string
  model?: string
  cwd?: string
  last_active_at?: string
}

/**
 * Start external agent stub session
 */
export const startExternalAgentStubSession = {
  method: "post",
  pathParams: ["agent_id"],
  queryParams: [],
  bodyParams: [
    "spec_version",
    "client_reference_id",
    "configs",
    "model",
    "cwd",
    "locale",
    "system_prompt",
  ],

  path: (p: StartExternalAgentStubSessionPathParameters): string =>
    `external_agent_stub/${p.agent_id}/sessions`,
} as const

type UpdateAgentCreditLimitPathParameters = {
  // The ID of the custom agent (a UUID). The personal agent (Notion AI) is not supported
  // by this endpoint.
  agent_id: IdRequest | "notion_ai" | "33333333-3333-3333-3333-333333333333"
}

type UpdateAgentCreditLimitBodyParameters = {
  // The per-agent credit limit as a non-negative integer, or null to clear the limit.
  credit_limit: number | null
}

export type UpdateAgentCreditLimitParameters =
  UpdateAgentCreditLimitPathParameters & UpdateAgentCreditLimitBodyParameters

export type UpdateAgentCreditLimitResponse = {
  agent_id: IdResponse
  // The agent's editor-set per-agent credit limit; null when no limit applies.
  credit_limit: number | null
  // ISO 8601 timestamp of when the agent was last edited.
  last_edited_time: string
}

/**
 * Update agent credit limit
 */
export const updateAgentCreditLimit = {
  method: "patch",
  pathParams: ["agent_id"],
  queryParams: [],
  bodyParams: ["credit_limit"],

  path: (p: UpdateAgentCreditLimitPathParameters): string =>
    `agents/${p.agent_id}/credit_limit`,
} as const

type UpdateAgentStatusPathParameters = {
  // The agent ID (a UUID), or `notion_ai` for the personal agent. Endpoint-specific
  // restrictions still apply.
  agent_id: IdRequest | "notion_ai" | "33333333-3333-3333-3333-333333333333"
}

type UpdateAgentStatusBodyParameters = {
  // Set to "active" to re-enable an agent that was disabled through this API, or
  // "disabled" to turn off a running agent.
  status: "active" | "disabled"
}

export type UpdateAgentStatusParameters = UpdateAgentStatusPathParameters &
  UpdateAgentStatusBodyParameters

export type UpdateAgentStatusResponse = {
  agent_id: IdResponse
  // "active" when the agent can run; "disabled" when it is paused (see pause_reason);
  // "deleted" when it has been removed.
  status: "active" | "disabled" | "deleted"
  // Why the agent is paused when status is "disabled" (e.g. "disabled_from_api",
  // "credit_limit"); null when active or deleted.
  pause_reason:
    | "run_limit"
    | "credit_limit"
    | "runaway_credit_usage"
    | "workspace_credit_limit"
    | "failure_limit"
    | "mark_session_failed_autopause"
    | "disabled_from_workspace_settings"
    | "disabled_from_api"
    | "disabled_from_agent_settings"
    | "disabled_due_to_no_members_with_access"
    | "disabled_due_to_lack_of_editors"
    | "disabled_by_notion"
    | "internal_error"
    | "needs_user_review"
    | "tool_unavailable"
    | null
  // ISO 8601 timestamp of when the agent was last edited.
  last_edited_time: string
}

/**
 * Update agent status
 */
export const updateAgentStatus = {
  method: "patch",
  pathParams: ["agent_id"],
  queryParams: [],
  bodyParams: ["status"],

  path: (p: UpdateAgentStatusPathParameters): string =>
    `agents/${p.agent_id}/status`,
} as const

type UpdateSessionBodyParameters =
  | {
      message: string
      agent_id?:
        | IdRequest
        | "notion_ai"
        | "33333333-3333-3333-3333-333333333333"
      session_id?: IdRequest
      attachments?: Array<{
        file_upload: { id: string }
        // Always `file_upload`
        type?: "file_upload"
        name?: string
      }>
      metadata?: Record<string, string>
      prompt_context?: string
    }
  | {
      session_id: IdRequest
      actions: Array<{
        action_id: IdRequest
        // One of: `approve`, `reject`
        option_id: "approve" | "reject"
      }>
      metadata?: Record<string, string>
    }
  | { session_id: IdRequest; continue_from: string }

export type UpdateSessionParameters = UpdateSessionBodyParameters

export type UpdateSessionResponse = {
  // Always `session`
  object: "session"
  id: string
  agent_id: string
  title: string
  // One of: `queued`, `in_progress`, `requires_action`, `completed`, `failed`, `canceled`,
  // `terminated`
  status:
    | "queued"
    | "in_progress"
    | "requires_action"
    | "completed"
    | "failed"
    | "canceled"
    | "terminated"
  created_at: string
  updated_at: string
  required_actions?: Array<{
    action_id: string
    title: string
    options: Array<{
      // One of: `approve`, `reject`
      id: "approve" | "reject"
      label: string
    }>
  }>
  error?: { code: string; message: string; retryable: boolean }
}

/**
 * Update a session
 */
export const updateSession = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: [
    "message",
    "agent_id",
    "session_id",
    "attachments",
    "metadata",
    "prompt_context",
    "actions",
    "continue_from",
  ],

  path: (): string => `sessions`,
} as const
